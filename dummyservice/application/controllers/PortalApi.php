<?php
defined('BASEPATH') or exit('No direct script access allowed');

require_once APPPATH . 'libraries/HTTP/Request2.php'; // Adjust the path as necessary

class PortalApi extends MY_Controller
{
    public $access_token;
    public $idUser;
    public function __construct()
    {
        parent::__construct();
        if (!class_exists('HTTP_Request2')) {
            print "no Lib found";
            return;
        }
        $this->idUser = "56ff5123-5102-4870-9999-d35fda47c018";
    }

    public function main()
    {
        $this->load->model('Mconfigkey');
        $hasil = $this->Mconfigkey->checktoken();
        $vtoken = json_decode($hasil, true);

        $access_token = $this->access_token;
        $module = $this->uri->segment(3);
        $moduleview = $this->uri->segment(4);
        # die($module. 'a'.$moduleview);
        $xaction = 'read';
        $dtinput = '';
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

    public function testSend($param = null)
    {
        // something here ... 
        if (isset($param["VNOMORAJU"])) {
            $param['NOMOR_AJU'] = $param['VNOMORAJU'];
            $param['BCTYPE'] = $param['VBCTYPE'];
            $param['VUSERNAME'] = $param['VUSERNAME'];
            $param['VIDCOMPANY'] = $param['VIDCOMPANY'];
        } else {
            return ("ERROR");
        }
        #print_r($param); die();
        $retMe = $this->sendToPortal($param);
        #print_r($retMe);
        return $retMe;
    }
    public function testStatus($param = null)
    {
        // something here ... 
        if (isset($param["VNOMORAJU"])) {
            $noAju = str_replace("-", "", $param['VNOMORAJU']);
            #print $noAju ; 
            $param = array(
                "NOMORAJU" => $noAju,
                "VUSERNAME" => $param['VUSERNAME'],
                "VIDCOMPANY" => $param['ID_COMPANY'],
            );
        } else {
            $param = array("NOMORAJU" => "15034002559920240612500511", "upil" => "nyangkut");
        }
        if (isset($_GET["VNOMORAJU"])) {
            $noAju = str_replace("-", "", $_GET['VNOMORAJU']);
            #print $noAju ; 
            $param = array("NOMORAJU" => $noAju, "upil" => "dapet");
        }
        $retMe = $this->getStatus($param);
        if ($retMe['success'] == 'true') {
            $this->testDownload($param);
        }
        #print_r($retMe);
        return json_encode($retMe);
    }

    public function bgDownload($param)
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
        $this->load->model('MportalData');
        $data = $this->MportalData->getListAjuTobeDownload();
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
        if ($retMe['success'] == 'true') {
            $getStatus = $this->getStatus($param);
            if ($getStatus) {
                #print_r($getStatus);
                #$update = $this->Mportal_data->update_status($getStatus);
                $update = $this->getStatus($param);
                return ($update);
            }
        } else {
            return json_encode ($retMe);
        }
        #print_r( $retMe); 
        #die();
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
            $retMe = array("success" => "false", "message" => "dokumen tidak dapat di upload / format dokumen tidak sesuai ");
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
            $noAju = str_replace("-", "", $_GET['nomorAju']);
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
    public function testLast($param)
    {

        // something here ... 
        $data = $param;

        if (isset($_GET["page"])) {
            $noAju = str_replace("-", "", $_GET['KODEDOKUMEN']);
            #print $noAju ; 
            $data = array("bctype" => $noAju, "page" => $_GET['CBO_PAGE'], "pages" => $_GET['page']);
        }
        if (isset($_POST["page"])) {
            $noAju = str_replace("-", "", $_GET['KODEDOKUMEN']);
            #print $noAju ; 
            $data = array("bctype" => $noAju, "page" => $_POST['page'], "pages" => $_POST['page']);
        }

        return ($this->getLastAju($data));
    }


    public function login($param = null)
    {
        // Generate dynamic cookie value
        $cookieValue = $this->generateCookieValue();
        // Make API request with dynamic cookie value
        try {
            if ($param != null || $param != '') {
                $loginUrl = $param;
            } else {
                $loginUrl = 'https://apis-gw.beacukai.go.id/v2/authws/user/login';
            }
			#$loginUrl = 'https://apis-gw.beacukai.go.id/v2/authws/user/login' ;
			
            $request = new HTTP_Request2($loginUrl);
            #$request = new HTTP_Request2('https://apis-gw.beacukai.go.id/nle-oauth/v1/user/login');
            #$request = new HTTP_Request2('https://apis-gw.beacukai.go.id/v2/authws/user/login');
            #test use kemenkeu API
            #$request->setUrl('https://apis-gw.beacukai.go.id/nle-oauth/v1/user/login/');
            $request->setMethod(HTTP_Request2::METHOD_POST);
            #$request->addPostParameter(array('username'=>'pemi_eds', 'password'=>'Pemi2022'));

            $request->setConfig(array(
                'follow_redirects' => TRUE
            ));
            $request->setHeader(array(
                'Content-Type' => 'application/json',
                'Cookie' => 'Customs_Cookie=' . $cookieValue
            ));
            // mager mode  :p
            $request->setBody('{"username":"pemi_eds", "password":"Pemi2022"}');

            $response = $request->send();
            if ($response->getStatus() == 200) {
                #echo $response->getBody();
                $xReturn =  json_decode($response->getBody(), true);
                $access_token = $xReturn['item']['access_token'];
                # print ($access_token);
                $myRet = array("success" => "true", "data" => $access_token);
                $this->access_token = $access_token;
            } else {
                $xReturn =  'Unexpected HTTP status: ' . $response->getStatus() . ' ' . $response->getReasonPhrase();
                $myRet = array("success" => "false", "data" => $xReturn);
            }
        } catch (HTTP_Request2_Exception $e) {
            $myRet = array("success" => "false", "data" => $e->getMessage());
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
                $myToken = $this->login($loginUrl);
				#$myToken = $this->login('https://apis-gw.beacukai.go.id/nle-oauth/v1/user/login');
			
                if ($myToken['success'] == "true") {
                    $access_token = "Bearer " . $myToken['data'];
                    $this->access_token = $access_token;
                } else {
                    print "error get token";
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
                'Authorization' => $this->access_token,
				'Beacukai-Api-Key' => '6222a75e-1dbb-493e-9461-27f721097e9c',
				'Sec-GPC'=> '1', 
				'User-Agent'=> 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 
				'sec-ch-ua' => '"Chromium";v="128", "Not;A=Brand";v="24", "Brave";v="128"', 
				'sec-ch-ua-platform'=> '"Windows"',
            );
            // content-type should be dynamic 
            // get access token from login() 
            /*
            $request->setHeader(array(
                'Content-Type' => 'application/json',
                'Cookie' => 'Customs_Cookie=' . $cookieValue,
                'Authorization' => $this->access_token,
                'Beacukai-Api-Key' => '6222a75e-1dbb-493e-9461-27f721097e9c',
            ));
            */
            $request->setHeader($header);
            #print_r($header);
            #print($param); 

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
            #]print_r($request['body']); die();
            // commit to API 
            #print_r ($request);
            $response = $request->send();
			#print_r($response->getBody()); 
			#print_r($response->getHeader()); 
			#die();
            #$this->access_token = $access_token;

            #$this->var_dump_pre($response->getHeader());
            #die(); 

            // catch response 
            if ($response->getStatus() == 200) {
                if ($param['type'] == "download") {
                    #$filePath = APPPATH. "download/portal_data/" ;
                    $filePath = "D:/uploads/internal/from_portal/";

                    $headers = $response->getHeader();
                    $cdValue = $headers['content-disposition'];
                    preg_match('/filename=(.+)/', $cdValue, $matches);
                    if (isset($matches[1])) {
                        $filename = trim($matches[1], '"');
                    }

                    #print $filename ; 
                    #$this->var_dump_pre($headers);
                    #die();

                    $filename = $filePath . $filename;
                    #die($filename);
                    file_put_contents($filename, $response->getBody());
                    #print $filename ;
                    $myRet = array("success" => "true", "data" => $filename);
                } else {
                    $xReturn =  json_decode($response->getBody(), true);
                    #$this->var_dump_pre($response->getHeader());
                    $myRet = array("success" => "true", "data" => $xReturn);
                }
            } else {
                #$xReturn =  'Unexpected HTTP status: ' .  $response->getHeader();
                #$myRet = array("status" => "false", "message" => $response->getBody());
                $myRet = array("success" => "false", "message" => json_encode($response->getBody()));
                #print_r($response->getBody()); 
				return $myRet;
				
            }
        } catch (HTTP_Request2_Exception $e) {
            $myRet = array("success" => "false", "messages" => json_decode($e->getMessage()));
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

        $idUser = "56ff5123-5102-4870-9999-d35fda47c018";
        if (isset($param)) {
            $noAju = $param['NOMORAJU'];
            #$noAju = '15034002559920240103500007';
            $data = array("idUser" => '56ff5123-5102-4870-9999-d35fda47c018', 'type' => 'return',);
            #$url = "https://apis-gw.beacukai.go.id/excel-service/v1/ekspor-xml/Xlsx?nomorAju=". $noAju."&idUser=". $idUser ; 
            $url = "https://apis-gw.beacukai.go.id/openapi/status/" . $noAju;
            #print($url);
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
                $toDownload = array(
                    "KODEDOKUMEN"     =>    $data['kodeDokumen'],
                    "NOMORAJU"        =>    $data['nomorAju'],
                    "TANGGALDAFTAR"    =>     $data['tanggalDaftar'],
                    "NOMORDAFTAR"    =>    $data['nomorDaftar'],
                    "KODESTATUS"    =>    $data['keterangan'],
                    "NOMORRESPON"   =>  $data['nomorRespon'],
                    "URLDOKUMENPABEAN" => $data['pdf'],

                );
                $proses_update = $this->update_by_respond($toDownload);
                if (!$proses_update) {
                    return array(
                        'success' => 'false',
                        'message' => 'Update dokumen gagal: update_by_respond',
                        'data' => $data
                    );
                } else {
                    $registerThread = array(
                        "NOMORAJU" => $param['NOMORAJU'],
                        "VUSERNAME" => $param['VUSERNAME'],
                        "VIDCOMPANY" => $param['VIDCOMPANY'],
                        "MODE" => 'REGISTER',
                    );
                    $this->toBeDownload($registerThread);

                    return (array(
                        'success' => 'true',
                        'message' => 'update dokumen berhasil',
                        'data' => $param
                    ));
                }
            } else {
                //opi ganti jadi out ke json
                return (array(
                    'success' => 'false',
                    'message' => 'Dokumen tidak ditemukan, NoAJU: ' . $noAju,
                    'data' => $data
                ));
            }
        } else {
            return (array(
                'success' => 'false',
                'message' => 'Error Parameter getStatus..',
                'data' => array()
            ));
        }
        return $data;
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
        $idUser = "56ff5123-5102-4870-9999-d35fda47c018";
        if (isset($param)) {
            $noAju = $param['NOMORAJU'];
            $BCType = $param['KODEDOKUMEN'];
            $filename = 'BC' . $BCType . '_' . $noAju . ".xlsx";
            #die($noAju);
            $data = array("idUser" => '56ff5123-5102-4870-9999-d35fda47c018', 'type' => 'download', 'filename' => $filename, "NOMORAJU" => $noAju,);
            if ($BCType === '27') {
                $url = "https://apis-gw.beacukai.go.id/excel-service/v1/ekspor-xml/Xlsx?nomorAju=" . $noAju . "&idUser=" . $idUser . "&kodeDokumen=" . $BCType;
            } else {
                $url = "https://apis-gw.beacukai.go.id/excel-service/v1/ekspor-xml/Xlsx?nomorAju=" . $noAju . "&idUser=" . $idUser;
            }


            $xReturn = $this->parseUrl($url, "GET", $data);
            #$this->var_dump_pre($xReturn);
            if ($xReturn['success'] == 'true') {
                $data['FilePath'] = $filename;
                $data['FileName'] = $noAju;
                $data['PNOMOR_AJU'] = $noAju;
                $data['VUSERNAME'] = 'SP_SYNC';
                $this->load->model('Mportal_data');
                $x = $this->Mportal_data->process_upload_form($data);
                if ($x) {
                    $z =  $this->syncToDBIT($data);
                    if ($z) {
                        $r = $this->getStatus($param);
                        return json_encode($r);
                    }
                    #return json_decode($z);
                } else {
                    return json_decode($x);
                }
            } else {
                $retMe = array("success" => "false", "message" => "Get Portal Data Failed " . json_decode($xReturn['message']));
                return $retMe;
            }
        } else {
            $retMe = array("success" => "false", "message" => "NOMOR AJU tidak terbaca ");
            return $retMe;
        }
    }
    function getAll27Docs($param)
    {
        $idUser = "56ff5123-5102-4870-9999-d35fda47c018";
        if (isset($param)) {
            # $noAju = "&nomorAju=" . $param['filter']['property']['nomorAju'];
            #$data = array("idUser" => '56ff5123-5102-4870-9999-d35fda47c018', 'type' => 'download', 'filename' => $filename, "NOMORAJU" => $noAju,);
            $data = array("idUser" => '56ff5123-5102-4870-9999-d35fda47c018', 'type' => 'return',);
            $page = $param["page"];
            #$page = '&size=' . $param['limit'] . '&page=' . $param['page'];
            #$pages = $param['pages'];
            # print $page . " -- --- " . $pages;
            #print_r($param);
            #$url = "https://apis-gw.beacukai.go.id/v2/browse-service/v1/browse/dokumen-pabean-portal?nomorIdentitas=010618684092000&size=50&idUser=56ff5123-5102-4870-9999-d35fda47c018&page=" . $page; //. $noAju . $page;
            $url = "https://apis-gw.beacukai.go.id/v2/browse-service/v1/browse/dokumen-pabean-portal?nomorIdentitas=010618684092000&kodeJalur=&namaPerusahaan=&namaPpjk=&kodeKantor=&nomorAju=&nomorDaftar=&page=" . $page . "&size=30&idUser=56ff5123-5102-4870-9999-d35fda47c018";
            #die($url);

            #GET https://apis-gw.beacukai.go.id/v2/browse-service/v1/browse/dokumen-pabean-portal?nomorIdentitas=010618684092000&nomorAju=858&size=10&page=1&idUser=56ff5123-5102-4870-9999-d35fda47c018
            $xReturn = $this->parseUrl($url, "GET", $data);
            #$this->var_dump_pre($xReturn);
            #print_r(json_encode($xReturn['data']));
            return json_encode($xReturn['data']);
        } else {
            return (print('failed'));
        }
    }

    function getLastAju($param)
    {
        $idUser = "56ff5123-5102-4870-9999-d35fda47c018";
        if (isset($param)) {
            # $noAju = "&nomorAju=" . $param['filter']['property']['nomorAju'];
            #$data = array("idUser" => '56ff5123-5102-4870-9999-d35fda47c018', 'type' => 'download', 'filename' => $filename, "NOMORAJU" => $noAju,);
            $data = array("idUser" => '56ff5123-5102-4870-9999-d35fda47c018', 'type' => 'return',);
            $page = $param["page"];
            if (isset($param["bctype"])) {
                $bctype = $param["bctype"];
            } else {
                $bctype = $param["KODEDOKUMEN"];
            }
            #$page = '&size=' . $param['limit'] . '&page=' . $param['page'];
            #$pages = $param['pages'];
            # print $page . " -- --- " . $pages;
            #print_r($param);
            #$url = "https://apis-gw.beacukai.go.id/v2/browse-service/v1/browse/dokumen-pabean-portal?nomorIdentitas=010618684092000&size=50&idUser=56ff5123-5102-4870-9999-d35fda47c018&page=" . $page; //. $noAju . $page;
            $url = "https://apis-gw.beacukai.go.id/v2/browse-service/v1/browse/dokumen-pabean-portal?nomorIdentitas=010618684092000&kodeJalur=&namaPerusahaan=&namaPpjk=&kodeKantor=&nomorAju=&nomorDaftar=&kodeDokumen=" . $bctype . "&page=" . $page . "&size=1&idUser=56ff5123-5102-4870-9999-d35fda47c018";
            #die($url);

            #GET https://apis-gw.beacukai.go.id/v2/browse-service/v1/browse/dokumen-pabean-portal?nomorIdentitas=010618684092000&nomorAju=858&size=10&page=1&idUser=56ff5123-5102-4870-9999-d35fda47c018
            $xReturn = $this->parseUrl($url, "GET", $data);
            #$this->var_dump_pre($xReturn);
            #print_r(json_encode($xReturn['data']));
            return json_encode($xReturn['data']);
        } else {
            return (print_r('failed'));
        }
    }

    function syncToDBIT($param)
    {
        $this->load->model('Mportal_data');
        $param['PNOMORAJU'] = $param['FileName'];
        $x = $this->Mportal_data->sync_to_dbit($param);
        #print_r($x);
        return $x;
    }

    function sendToPortal($param)
    {

        if (isset($param)) {

            //$dataBC = $param['dataBC'];
            $url = "https://apis-gw.beacukai.go.id/openapi/document";
            #$xReturn = $this->parseUrl($url, "POST", $dataBC);
            #$this->var_dump_pre($xReturn);
            #return json_encode($xReturn['data']);

            if (isset($param['VIDCOMPANY']) == 'aw') {

                $data['NOMOR_AJU'] = $param['VNOMORAJU'];
                $data['BCTYPE'] = $param['VBCTYPE'];
                $data['VUSERNAME'] = $param['VUSERNAME'];
                $this->load->model('Matemp_dokumen');

                $retMe = $this->Matemp_dokumen->send_to_portal($data);
                $toBody = (json_encode($retMe));

                $xReturn = $this->parseUrl($url, "POST", $toBody);
                #print_r($xReturn); die("now");
            } else {
                $this->load->model('Matemp_dokumen');
                $data['NOMOR_AJU'] = $param['VNOMORAJU'];
                $data['BCTYPE']  = $param['VBCTYPE'];
                $data['vheader'] = $param['vheader'];

                #$retMe = $this->Matemp_dokumen->send_to_portal($data); 
                #$toBody = (json_decode($retMe));
                #$xReturn = $this->parseUrl($url, "POST", $toBody);
            }
            /*
			if($xReturn['status']=='true'){
                $myRet =  array(
                    'success' => 'true',
                    'data' => $xReturn['data'],
                    'message' => 'portal berhasil'
                );
            }else 
            {
                $myRet =  array(
                    'success' => 'false',
                    'data' => $xReturn['data'],
                    'message' => 'portal gagal'
                );
            }
            */
            #return json_encode($myRet);
            #print_r (json_encode($xReturn));
            return json_encode($xReturn);


            //print_r($dataBC);
        } else {
            return "failed";
        }
    }

    function update_by_respond($param)
    {
        $this->load->database();

        $myQuery = "
            UPDATE tr_bc_header SET 				
				
				NOMOR_DAFTAR = ?, 
				TANGGAL_DAFTAR = ?,
				MODE_STATUS =? , 
                PORTAL_STATUS = ?, 
                NOMOR_RESPON= ?,
                URL_DOKUMEN_PABEAN = ?
			WHERE NOMOR_AJU = ? 
			";
        $data = [
            $param['NOMORDAFTAR'],
            $param['TANGGALDAFTAR'],
            $param['KODESTATUS'],
            $param['KODESTATUS'],
            $param['NOMORRESPON'],
            $param['URLDOKUMENPABEAN'],
            $param['NOMORAJU']
        ];
        $retMe = $this->db->query($myQuery, $data);

        if ($retMe) {
            $hasil = array(
                'success' => 'true',
                'message' => 'Update Data Berhasil',
                'data' => $param
            );
        } else {
            $hasil = array(
                'success' => 'false',
                'message' => 'Update Data Gagal',
                'data' => $param
            );
        }
        return json_encode($this->db->last_query());
    }

    function toBeDownload($param)
    {
        $this->load->database();
        $SQL_CALLSP = " EXEC SP_REGISTER_TOBE_DOWNLOAD
        @VIDCOMPANY=?,
        @VUSERNAME=?,
        @VNOMORAJU=?, 
        @MODE=?
        ";
        $data = array(
            '@VIDCOMPANY' => $param['ID_COMPANY'],
            '@VUSERNAME' => $param['VUSERNAME'],
            '@VNOMORAJU' => $param['NOMORAJU'],
            '@MODE' => $param['MODE'],
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $rows = $result->result_array();

        return json_encode($rows);
    }
}