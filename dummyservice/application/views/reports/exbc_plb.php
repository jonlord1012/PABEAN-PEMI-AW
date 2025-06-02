<h2 style="text-align: center;"><strong>Daftar Pengeluaran Barang dari PLB</strong></h2>
<p>&nbsp;</p>
<h4>Nomor Invoice : <?= $param['INVOICE_NO'] ?> </h4>
<h4>Tanggal Invoice : <?= $param['INVOICE_DATE'] ?> </h4>
<h4>Pemilik Barang :<?= $param['TENANT_NAME'] ?></h4>
<h4>Penerima Barang :<?= $param['CLIENT_NAME'] ?></h4>
<p>&nbsp;</p>
<table style="border-collapse: collapse; width: 100%;" border="1">
   <tbody>
      <tr>
         <th style="width: 4.04667%; text-align: center;">No</th>
         <th style="width: 16.6667%; text-align: center;">Kode Barang</th>
         <th style="width: 26.5432%; text-align: center;">Uraian</th>
         <th style="width: 10.3567%; text-align: center;">Qty</th>
         <th style="width: 9.12212%; text-align: center;">Uom</th>
         <th style="width: 15.4664%; text-align: center;">Nomor Daftar Asal</th>
         <th style="width: 17.7984%; text-align: center;">Tanggal Daftar Asal</th>
      </tr>
      <tr>
         <?= $param['data'] ?>
      </tr>
   </tbody>
</table>