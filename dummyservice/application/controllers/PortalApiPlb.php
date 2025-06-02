<?php
defined('BASEPATH') or exit('No direct script access allowed');

require_once APPPATH . 'libraries/HTTP/Request2.php'; // Adjust the path as necessary
#ini_set('display_errors', '1');
#ini_set('display_startup_errors', '1');
#error_reporting(E_ALL);
class PortalApiPlb extends MY_Controller
{
   public $access_token;
   public $idUser;
   private $idUserCeisa ; 
   private $idPasswordCeisa ; 
   public function __construct()
   {
      parent::__construct();
      if (!class_exists('HTTP_Request2')) {
         print "no Lib found";
         return;
      }
      $this->idUser = "d6f65664-a921-417b-ab4a-b3892de5c860";
	  $this->load->model("Mauth") ; 
	  $ceisa = $this->Mauth->getPortalUser() ; 
	  #print_r($ceisa) ; 
	  $this->idUserCeisa= $ceisa['USERNAME'] ; 
	  $this->idPasswordCeisa = $ceisa['PASSWORD'] ; 
	  #print ($this->idUserCeisa) ; 
	  #print ($this->idPasswordCeisa) ; 
	  #die();
	  
   }

   public function main()
   {
		$this->load->model('Mconfigkey');
		$hasil = $this->Mconfigkey->checktoken();
		$vtoken = json_decode($hasil,true);

		$access_token = $this->access_token;
      #$access_token = $this->access_token;
      $module = $this->uri->segment(3);
      $moduleview = $this->uri->segment(4);
      $xaction = 'read';
      $dtinput = [];
      if ($this->uri->segment(5)) {
         $xaction = $this->uri->segment(5);
         $json = file_get_contents('php://input');
         $dtinput = json_decode($json, true);
      } else {
         if ($module !== $moduleview) {
            $dtinput = array_merge($this->input->post(NULL, TRUE), $this->input->get(NULL, TRUE));
            #$xaction = 'read';
            $xaction = $this->uri->segment(3);
            $json = file_get_contents('php://input');
            $dtinput = json_decode($json, true);
         } else {
            $json = file_get_contents('php://input');
            $dtinput = json_decode($json, true);
            $xaction = $dtinput['method'];
         }
      }
      $dtinput = array_merge($dtinput, array(
         'VUSERNAME' => $vtoken['data']['VUSERNAME'],
         'ID_COMPANY' => $vtoken['data']['ID_COMPANY']
      ));

      $data = $this->$xaction($dtinput);
      print($data);
   }

   public function testStatus($param = null)
   {
      // something here ... 
      if (isset($param["nomorAju"])) {
         $noAju = str_replace("-", "", $param['nomorAju']);
         #print $noAju ; 
         $param = array("NOMORAJU" => $noAju, "upil" => "dapet");
      } else {
         $param = array("NOMORAJU" => "15034002559920240612500511", "upil" => "nyangkut");
      }
      if (isset($_GET["nomorAju"])) {
         $noAju = str_replace("-", "", $_GET['nomorAju']);
         #print $noAju ; 
         $param = array("NOMORAJU" => $noAju, "upil" => "dapet");
      }
      $retMe = $this->getStatus($param);
      #print_r($retMe);
      return (print_r(($retMe)));
   }

   public function testDownload($param)
   {
      // something here ... 

      if (isset($_GET["nomorAju"])) {
         $noAju = str_replace("-", "", $_GET['nomorAju']);
         #print $noAju ; 
         $param = array("NOMORAJU" => $noAju, "KODEDOKUMEN" => $param['KODEDOKUMEN']);
      }
      if (isset($param["NOMORAJU"])) {
         $noAju = str_replace("-", "", $param['NOMORAJU']);
         $data = array("NOMORAJU" => $noAju, "KODEDOKUMEN" => $param['KODEDOKUMEN']);
      } else {
         $data = array("NOMORAJU" => "00003000943920240305900376", "KODEDOKUMEN" => $param['KODEDOKUMEN']);
      }
      $retMe =  $this->getFileResponse($data);
      if ($retMe) {
         $getStatus = $this->getStatus($param);
         if ($getStatus) {
            #print_r($getStatus);
            $update = $this->Mportal_data->update_status($getStatus);
            return ($update);
         }
      }
      return json_encode($retMe);
   }

   function testUpload($param)
   {
      if (isset($param)) {
         $fileName = substr($param['FileName'], strrpos($param['FileName'], "_") + 1);
         $noAju = str_replace(".xlsx", "", $fileName);

         $data['FilePath'] = $param['FilePath'];
         $data['FileName'] = $fileName;
         $data['PNOMOR_AJU'] = $noAju;
         #$data['VUSERNAME'] = 'SP_SYNC';
         $this->load->model('Mportal_data');
         $x = $this->Mportal_data->process_upload_form($data);
         #print_r($x);
         if ($x) {
            $z =  $this->syncToDBIT($data);
            return ((($z)));
         } else {
            return ((($x)));
         }
      } else {
         $retMe = array("success" => "failed", "message" => "dokumen tidak dapat di upload / format dokumen tidak sesuai ");
         return (json_encode($retMe));
      }
   }
   public function testBrowse($param)
   {
      // paging ...
      /* if (array_key_exists('limit', $param)) {
            $data = array("limit" => $param['limit'], "page" => $param['page']);
        }
        */
      /*
        if (array_key_exists('filter', $param)) {
            #$keyval = json_decode($param['filter'], true);
            $data = json_decode($param['filter'], true);
        }*/

      // something here ... 
     $data = $param;

        if (isset($_GET["page"])) {
            $noAju = str_replace("-", "", $_GET['nomorAju']);
            #print $noAju ; 
            $data = array("NOMORAJU" => $noAju, "page" => $_GET['CBO_PAGE'], "pages" => $_GET['page']);
        }
        if (isset($_POST["page"])) {
			if(isset($_GET['nomorAju'])) {
				$noAju = str_replace("-", "", $_GET['nomorAju']);
			}
            #print $noAju ; 
            $data = array("NOMORAJU" => $noAju, "page" => $_POST['page'], "pages" => $_POST['page']);
        }
        #print_r($data);
        /*
        if (isset($param["nomorAju"])) {
            $noAju = str_replace("-", "", $param['nomorAju']);
            $data = array("NOMORAJU" => $noAju, "upil" => "dapet", "page" => $param['CBO_PAGE'], "pages" => $param['page']);
        } else {
            $data = array("NOMORAJU" => "00003000943920240305900376", "page" => $param['CBO_PAGE'], "pages" => $param['page']);
        }*/
        #print_r($data);
        #die();
        #print(($this->getAll27Docs($data)));

        return ($this->getAll27Docs($data));
   }


   public function login($param=null)
   {
      // Generate dynamic cookie value
      $cookieValue = $this->generateCookieValue();
      // Make API request with dynamic cookie value
      try {
		  
		  if ($param != null || $param != '') {
            $loginUrl = $param;
         } else {
            $loginUrl = 'https://apis-gw.beacukai.go.id/nle-oauth/v1/user/login';
         }
		 $request = new HTTP_Request2($loginUrl);
         #$request = new HTTP_Request2('https://apis-gw.beacukai.go.id/nle-oauth/v1/user/login');
         #$request = new HTTP_Request2('https://apis-gw.beacukai.go.id/v2/authws/user/login');

         #$request->setUrl('https://apis-gw.beacukai.go.id/nle-oauth/v1/user/login/');
         $request->setMethod(HTTP_Request2::METHOD_POST);
         #$request->addPostParameter(array('username'=>'pemi_eds', 'password'=>'Pemi2022'));

         $request->setConfig(array(
            'follow_redirects' => TRUE
         ));
         $request->setHeader(array(
            'Content-Type' => 'application/json',
            'Cookie' => 'Customs_Cookie=' . $cookieValue,
			
         ));
         // mager mode  :p
          #$request->setBody('{"username":"pemi_eds", "password":"Pemi2022"}');
         $body  = '{"username" :"'.$this->idUserCeisa . '" , "password" : "'.$this->idPasswordCeisa.'"}' ; 
		 #die($body) ; 
		 $request->setBody($body) ; 
		 #$request->setBody('{"username":"seiwabalaraja1", "password":"Sinergi#24"}');
		 #$request->setBody('{"username":"seiwabalaraja1", "password":"Sinergi#24"}');

         $response = $request->send();
         if ($response->getStatus() == 200) {
            #echo $response->getBody();
            $xReturn =  json_decode($response->getBody(), true);
            $access_token = $xReturn['item']['access_token'];
            # print ($access_token);
            $myRet = array("status" => "true", "data" => $access_token);
            $this->access_token = $access_token;
         } else {
            $xReturn =  'Unexpected HTTP status: ' . $response->getStatus() . ' ' . $response->getBody();
            $myRet = array("status" => "false", "data" => $xReturn);
			$this->var_dump_pre($xReturn);
         }
      } catch (HTTP_Request2_Exception $e) {
         $myRet = array("status" => "false", "data" => $e->getMessage());
      }
      return $myRet;
      /*
        try {
            $addLogin =  new HTTP_Request2('https://apis-gw.beacukai.go.id/v2/amws/v1/user-log/add');
            $addLogin->setMethod(HTTP_Request2::METHOD_POST);

            $header = array(
                'Content-Type' => 'application/json',
                'Cookie' => 'Customs_Cookie=' . $cookieValue,
                'Authorization' => $this->access_token,
                'Beacukai-Api-Key' => '6222a75e-1dbb-493e-9461-27f721097e9c',
            );

            $body = array(
                'browserInfo' => 'Chrome:120.0.0.0',
                'deskripsi' => 'PATH:/ ACTIVITY:access_page',
                'hostname' => 'https://portal.beacukai.go.id',
                'idUser' => 'kevin-w@pemi.co.id',
                'ipLokal' => '127.0.0.1',
                'ipPublik' => '',
                'latitude' => "NOT_AUTHORIZED",
                'longitude' => "NOT_AUTHORIZED",
                'username' => "pemi_eds",
            );

            $addLogin->setHeader($header);
            $addLogin->setBody($body);

            $responseLog = $addLogin->send();
            if ($responseLog->getStatus() == 200) {
                $xAdd =  json_decode($responseLog->getBody(), true);
                $idUserLog = $xAdd['item']['idUserlog'];
            } else {
                $xAdd =  'Unexpected HTTP status: ' . $responseLog->getStatus() . ' ' . $responseLog->getReasonPhrase();
                $xAdd = array("status" => "false", "data" => $xAdd);
            }


            $removeLog =  new HTTP_Request2('https://apis-gw.beacukai.go.id/v2/amws/v1/user-log/add');
            $removeLog->setMethod(HTTP_Request2::METHOD_POST);
            $setBody = array('idUserLog' => $idUserLog);
            $headerLog = array(
                'Content-Type' => 'application/json',
                'Cookie' => 'Customs_Cookie=' . $cookieValue,
                'Authorization' => $this->access_token,
                'Beacukai-Api-Key' => '6222a75e-1dbb-493e-9461-27f721097e9c',
            );
            $removeLog->setHeader($headerLog);
            $removeLog->setBody($setBody);
            $removeLog->send();
        } catch (HTTP_Request2_Exception $e) {
            $myRet = array("status" => "false", "data" => $e->getMessage());
        }
        return $myRet;


*/
   }

   // Function to generate dynamic cookie value
   private function generateCookieValue()
   {
      // Implement your logic to generate a dynamic cookie value here
      // For example, you can generate a random string
      return bin2hex(random_bytes(16)); // Generate a random 32-character hex string
   }

   public function parseUrl($url, $method = "POST", $param = null)
   {
      // Generate dynamic cookie value

      #print $url ; 
      $cookieValue = $this->generateCookieValue();
      if (!isset($url)) {
         print "Error";
         return;
      }

      // Make API request with dynamic cookie value
      try {
		  if ($this->access_token == null || $this->access_token = nothing) {
            if ($param['type'] == 'download') {
               $loginUrl = 'https://apis-gw.beacukai.go.id/v2/authws/user/login';
            } else {
               $loginUrl = 'https://apis-gw.beacukai.go.id/nle-oauth/v1/user/login';
            }
            // get access_token 
            $myToken = $this->login('https://apis-gw.beacukai.go.id/v2/authws/user/login');
			
		  #print $this->access_token ; 
		  #die(print_r($myToken)); 
		  
            if ($myToken['status'] == "true") {
               $access_token = "Bearer " . $myToken['data'];
               $this->access_token = $access_token;
            } else {
               $myToken = $this->login($loginUrl);
               $access_token = "Bearer " . $myToken['data'];
               $this->access_token = $access_token;
               return;
            }
         }
         $request = new HTTP_Request2();
         $request->setUrl($url);
         $header = array(
            'Content-Type' => 'application/json',
            'Cookie' => 'Customs_Cookie=' . $cookieValue,
            'Authorization' => $access_token,
			'Beacukai-Api-Key' => '6222a75e-1dbb-493e-9461-27f721097e9c',
			'Sec-GPC'=> '1', 
			'User-Agent'=> 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 
			'sec-ch-ua' => '"Chromium";v="128", "Not;A=Brand";v="24", "Brave";v="128"', 
			'sec-ch-ua-platform'=> '"Windows"',
         );
		  $request->setHeader($header);
            #print_r($header);
            #print_r($param); 
            
            #die();
            // check for valid method, give error instead 
            if ($method == "POST") {
                
                $request->setMethod(HTTP_Request2::METHOD_POST);
                // parsing the body / extra header parameters
                $request->setBody($param);
            } elseif ($method == "GET") {
                #$request = new HTTP_Request2($url);
                $request->setMethod(HTTP_Request2::METHOD_GET);
            } else {
                print "ERROR METHOD";
                return;
            }

            // parsing option(s)
            $request->setConfig(array(
                'follow_redirects' => TRUE
            ));

            #$request->setBody($body);
            #print_r($request['body']); die();
            // commit to API 
            #print_r ($request);
			#die();
            $response = $request->send();
			#print_r($response->getBody()); 
			#print_r($response->getHeader()); 
			#die();
			
         // catch response 
         if ($response->getStatus() == 200) {
            if ($param['type'] == "download") {
               #$filePath = APPPATH. "download/portal_data/" ;
               $filePath = "D:/uploads/internal/from_portal/";
               #$filePath = "D:/uploads/plb/from_portal/";
               $headers = $response->getHeader();
               $cdValue = $headers['content-disposition'];
               preg_match('/filename=(.+)/', $cdValue, $matches);
               if (isset($matches[1])) {
                  $filename = trim($matches[1], '"');
               }

               /*
               print $filename;
               $this->var_dump_pre($headers);
               print_r($response->getBody());
               die();
               */

               $filename = $filePath . $filename;
               #die($filename);
               file_put_contents($filename, $response->getBody());
               #print $filename;
               #die();
               $myRet = array("status" => "true", "data" => $filename);
            } else {
               $xReturn =  json_decode($response->getBody(), true);
               #$this->var_dump_pre($response->getHeader());
               $myRet = array("status" => "true", "data" => $xReturn);
            }
         } else {
            $xReturn =  'Unexpected HTTP status:' . $response->getStatus() . ' ' . $response->getReasonPhrase();
            $myRet = array("status" => "false", "data" => $xReturn);
            return $myRet;
         }
      } catch (HTTP_Request2_Exception $e) {
         $myRet = array("status" => "false", "data" => $e->getMessage());
      }
      return $myRet;
   }

   /**
    *  usage : get status perAJU          
    *  access_method : API 
    *  url : {API_URL}/openapi/status/:nomorAju
    *  param : array({"nomoraju"})
    *  pre-access : login / access token & auth bearer needed 
    * 
    * 
    */
   /** 
    * sample response (portal.beacukai.go.id)
    * {
    *       "dataStatus":[{
    *           "nomorAju":"Nomor Aju",
    *           "kodeStatus":"Kode Status",
    *           "nomorDaftar":"Nomor Daftar",
    *           "tanggalDaftar":"Tanggal Daftar",
    *           "waktuStatus":"Waktu Status",
    *           "keterangan":"Keterangan"
    *       }],
    *       "dataRespon":[{
    *           "nomorAju":"Nomor Aju",
    *           "kodeRespon":"Kode Respon",
    *           "nomorDaftar":"Nomor Daftar",
    *           "tanggalDaftar":"Tanggal Daftar",
    *           "nomorRespon":"Nomor Respon",
    *           "tanggalRespon":"Tanggal Respon",
    *           "waktuRespon":"Waktu Respon",
    *           "waktuStatus":"Waktu Status",
    *           "keterangan":"Keterangan",
    *           "pesan":[
    *               { "uraian1", "uraian2" }
    *           ],
    *           "Pdf":"Base64encode PDF file"
    *        }]
    *       }
    */
   public function getStatus($param)
   {
      // idUser :: 56ff5123-5102-4870-9999-d35fda47c018
      // https://apis-gw.beacukai.go.id/excel-service/v1/ekspor-xml/Xlsx?nomorAju=00002301061820240304500046&idUser=56ff5123-5102-4870-9999-d35fda47c018
      // https://apis-gw.beacukai.go.id/openapi/status/15032702559920231108501504

      #$idUser = "56ff5123-5102-4870-9999-d35fda47c018";
      $idUser = "235043f0-b868-4509-b9bc-e54b8fc198f5";

      if (isset($param)) {
         $noAju = $param['NOMORAJU'];
         #$noAju = '15034002559920240103500007';
         $data = array("idUser" => 'd6f65664-a921-417b-ab4a-b3892de5c860', 'type' => 'return',);
         #$url = "https://apis-gw.beacukai.go.id/excel-service/v1/ekspor-xml/Xlsx?nomorAju=". $noAju."&idUser=". $idUser ; 
         $url = "https://apis-gw.beacukai.go.id/openapi/status/" . $noAju;
         $xReturn = $this->parseUrl($url, "GET", $data);
         if (array_key_exists('dataRespon', $xReturn['data'])) {
            $data = $xReturn['data']['dataRespon'][0];
            #$this->var_dump_pre($data);
            /*
                echo "<h1> Nomor AJU : " . $data[0]['nomorAju'] . " </h1>";
                echo "<h1> STATUS: " . $data[0]['keterangan'] . " </h1>";
                echo "<h1> Nomor Daftar: " . $data[0]['nomorDaftar'] . " </h1>";
                echo "<h1> Tanggal Daftar: " . $data[0]['tanggalDaftar'] . " </h1>";
                echo "<h1> Nomor Respon: " . $data[0]['nomorRespon'] . " </h1>";
                */
            #die("upil");
         }
         return (($data));

         #print_r($xReturn['data']['dataRespon']);
         #$this->var_dump_pre($xReturn);
      } else {
         return "failed";
      }
      # return $data;
   }
   function var_dump_pre($mixed = null)
   {
      echo '<pre>';
      var_dump($mixed);
      echo '</pre>';
      return null;
   }

   function getFileResponse($param)
   {
      $idUser = "d6f65664-a921-417b-ab4a-b3892de5c860";
      if (isset($param)) {
         $noAju = $param['NOMORAJU'];
         $BCType = $param['KODEDOKUMEN'];
         $filename = 'BC' . $BCType . '_' . $noAju . ".xlsx";
         #die($noAju);
         $data = array("idUser" => 'd6f65664-a921-417b-ab4a-b3892de5c860', 'type' => 'download', 'filename' => $filename, "NOMORAJU" => $noAju,);
         if ($BCType === '27') {
            $url = "https://apis-gw.beacukai.go.id/excel-service/v1/ekspor-xml/Xlsx?nomorAju=" . $noAju. '&kodeDokumen=27' ;
         } else {
            $url = "https://apis-gw.beacukai.go.id/excel-service/v1/ekspor-xml/Xlsx?nomorAju=" . $noAju . "&idUser=" . $idUser;
         }


         $xReturn = $this->parseUrl($url, "GET", $data);
         #$this->var_dump_pre($xReturn);
         #die();

         if ($xReturn['status'] == 'true') {
            $data['FilePath'] = $filename;
            $data['FileName'] = $noAju;
            $data['PNOMOR_AJU'] = $noAju;
            $data['VUSERNAME'] = 'SP_SYNC';
            $data['ISINTERNAL'] = '1';
            $this->load->model('Mportal_data');
            $x = $this->Mportal_data->process_upload_form($data);
            #print_r($x);
            if ($x) {
               $z =  $this->syncToDBIT($data);
               return json_decode($z);
            } else {
               return json_decode($x);
            }
         } else {
            $retMe = array("success" => "failed", "message" => "Get Portal Data Failed " + $xReturn['data']);
            return $retMe;
            die();
         }
      } else {
         $retMe = array("success" => "failed", "message" => "NOMOR AJU tidak terbaca ");
         return $retMe;
         die();
      }
   }
   function syncToDBIT($param)
   {
      $this->load->model('Mportal_data');
      $param['PNOMORAJU'] = $param['FileName'];
      $param['ISINTERNAL'] = $param['ISINTERNAL'];
      $x = $this->Mportal_data->sync_to_dbit($param);
      #print_r($x);
      return $x;
   }

   function getAll27Docs($param)
   {
      $idUser = "d6f65664-a921-417b-ab4a-b3892de5c860";
      if (isset($param)) {
         # $noAju = "&nomorAju=" . $param['filter']['property']['nomorAju'];
         #$data = array("idUser" => '56ff5123-5102-4870-9999-d35fda47c018', 'type' => 'download', 'filename' => $filename, "NOMORAJU" => $noAju,);
         #$data = array("idUser" => '235043f0-b868-4509-b9bc-e54b8fc198f5', 'type' => 'return',);
         $data = array("idUser" => 'd6f65664-a921-417b-ab4a-b3892de5c860', 'type' => 'return',);
         $page = $param["page"];
         #$page = '&size=' . $param['limit'] . '&page=' . $param['page'];
         #$pages = $param['pages'];
         # print $page . " -- --- " . $pages;
         #print_r($param);
         #$url = "https://apis-gw.beacukai.go.id/v2/browse-service/v1/browse/dokumen-pabean-portal?nomorIdentitas=010618684092000&size=50&idUser=56ff5123-5102-4870-9999-d35fda47c018&page=" . $page; //. $noAju . $page;
         #$url = "https://apis-gw.beacukai.go.id/v2/browse-service/v1/browse/dokumen-pabean-portal?nomorIdentitas=032959983008000&kodeJalur=&namaPerusahaan=&namaPpjk=&kodeKantor=&nomorAju=&nomorDaftar=&page=" . $page . "&size=30&idUser=d6f65664-a921-417b-ab4a-b3892de5c860";
		 $url = "https://apis-gw.beacukai.go.id/v2/browse-service/v1/browse/dokumen-pabean-portal?nomorIdentitas=032959983008000&kodeJalur=&namaPerusahaan=&namaPpjk=&kodeKantor=&nomorAju=&nomorDaftar=&size=1000&idUser=d6f65664-a921-417b-ab4a-b3892de5c860"; 
         #die($url);
         #GET https://apis-gw.beacukai.go.id/v2/browse-service/v1/browse/dokumen-pabean-portal?nomorIdentitas=010618684092000&nomorAju=858&size=10&page=1&idUser=56ff5123-5102-4870-9999-d35fda47c018
         $xReturn = $this->parseUrl($url, "GET", $data);
         #$this->var_dump_pre($xReturn);
		 #die();
         #print_r(json_encode($xReturn['data']));
         return json_encode($xReturn['data']);
      } else {
         return (print_r('failed'));
      }
   }


   function sendToPortal($param)
   {

      if (isset($param)) {

         //$dataBC = $param['dataBC'];
         $url = "https://apis-gw.beacukai.go.id/openapi/document/isFinal=false";
         #$xReturn = $this->parseUrl($url, "POST", $dataBC);
         #$this->var_dump_pre($xReturn);
         #return json_encode($xReturn['data']);
         $this->load->model('Mportal_data');
         $data['NOMOR_AJU'] = $param['VNOMORAJU'];
         $data['BCTYPE']  = $param['BCTYPE'];

         $retMe = $this->Mportal_data->sync_to_dbit($data);

         #print_r(json_decode($retMe));

         //print_r($dataBC);
      } else {
         return "failed";
      }
   }
}
