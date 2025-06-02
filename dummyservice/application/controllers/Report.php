<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Report extends MY_Controller
{
    public function module()
    {
        $module = $this->uri->segment(3);
        $model = 'M' . $this->uri->segment(3);

        $this->load->model($model);
        $dtinput = array_merge($this->input->post(NULL, TRUE), $this->input->get(NULL, TRUE));
        $validate = json_decode($dtinput['validate'], true);
        $xaction = $validate["xfunction"];

        $data = $this->$model->$xaction($dtinput);
        print($data);
    }
    public function api()
    {
        $this->load->model('Mconfigkey');
        $hasil = $this->Mconfigkey->checktoken();
        $vtoken = json_decode($hasil, true);

        if ($vtoken['success'] == 'false') {
            print($hasil);
            return false;
        }
        $module = $this->uri->segment(3);
        $moduleview = $this->uri->segment(4);
        $model = 'M' . $this->uri->segment(3);
        $this->load->model($model);

        $xaction = 'read';
        $dtinput = '';
        if ($this->uri->segment(5)) {
            $xaction = $this->uri->segment(5);
            $json = file_get_contents('php://input');
            $dtinput = json_decode($json, true);
        } else {
            if ($module !== $moduleview) {
                $dtinput = array_merge($this->input->post(NULL, TRUE), $this->input->get(NULL, TRUE));
                $xaction = 'read';
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

        $data = $this->$model->$xaction($dtinput);
        print($data);
    }
    public function auth()
    {
        $json = file_get_contents('php://input');
        $dtinput = json_decode($json, true);
        $this->load->model('Mauth');
        $data = $this->Mauth->main($dtinput);

        print($data);
    }
    public function reload()
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET');
        header('Content-Type: application/json');

        $this->load->model('Mconfigkey');
        $hasil = $this->Mconfigkey->checktoken();
        $vtoken = json_decode($hasil, true);
        $out = array();
        if ($vtoken['success'] == 'false') {
            print($hasil);
        } else {
            $out = array(
                'success' => 'true',
                'message' => 'Token Ok'
            );
            print(json_encode($out));
        }
    }
    function PHPExcel()
    {
        // require_once dirname(__FILE__) . '/../Classes/PHPExcel.php';
    }
    function master_goods()
    {

        // $this->load->model('Mconfigkey');
        // $hasil = $this->Mconfigkey->checktoken();
        // $vtoken = json_decode($hasil, true);
        // $out = array();
        // if($vtoken['success']=='false'){
        //     print ($hasil);
        // }else{
        //     $out = array(
        //         'success'=>'true',
        //         'message'=>'Token Ok'
        //     );
        //     print (json_encode($out));
        // }        

        $this->load->model('Mconfigkey');
        $hasil = $this->Mconfigkey->checktoken();
        $vtoken = json_decode($hasil, true);

        if ($vtoken['success'] == 'false') {
            print($hasil);
            return false;
        }
        $db = $this->db->get("MST_PART_PLB")->result_array();

        return json_encode([
            "data" => $db
        ]);
    }
}
