<template>
  <div class="Userdata">
    <el-button type="increase" @click="showAddPage()" plain>新增专辑</el-button>
      <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="albunId"
      label="专辑编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="albumName"
      label="专辑名字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="albumMajor"
      label="专辑简介"
      width="180">
    </el-table-column>
    <el-table-column
      prop="albumPublishtime"
      label="发行时间"
      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
          <!--
            scope.&index  列的索引
            scope.row  这一行的数据
        -->
        <el-button
          size="mini"
          @click="showEditPage(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :title="flag" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="专辑编号">
         <el-input v-model="form.albunId" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="专辑名字">
         <el-input v-model="form.albumName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专辑简介">
         <el-input v-model="form.albumMajor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发行时间">
         <el-input v-model="form.albumPublishtime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
  .Userdata{
    margin: 2%;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: rgb(158, 195, 209);
  }
</style>

<script>

import {deleteById,getInfo,update,add} from '@/api/album/albumset';

  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 0) {
          return 'warning-row';
        } 
          return 'success-row';
      },
      showEditPage(index,row){
        this.flag = "编辑专辑信息";
        this.form.albunId=row.albunId;
        this.form.albumName=row.albumName;
        this.form.albumMajor=row.albumMajor;
        this.form.albumPublishtime=row.albumPublishtime;
        this.dialogFormVisible=true;
      },
      showAddPage(){
          this.flag="新增一个专辑";
          this.dialogFormVisible=true;
      },
      handleDelete(index,row){
          deleteById({id:row.albunId}).then(res =>{
        this.getAll(); 
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        });     
      }).catch(err =>{
        this.$message({
          showClose: true,
          message: '删除失败',
          type: 'error'
        });
      })
      },
      edit(){
          if(this.flag === "新增一个专辑"){
            add(this.form).then(res =>{
            // 先隐藏对话框  再提示添加成功
            this.getAll();
            this.dialogFormVisible = false;
            this.$message({
                showClose: true,
                message: '新增成功',
                type: 'success'
            });  
            this.form.albunId=this.form.albumName=this.form.albumMajor=
                this.form.albumPublishtime="";
            }).catch(err =>{
            this.$message({
                showClose: true,
                message: '新增失败',
                type: 'error'
            });
            this.form.albunId=this.form.albumName=this.form.albumMajor=
                this.form.albumPublishtime="";
            })
          }else if(this.flag === "编辑专辑信息"){
            update(this.form).then(res =>{
            // 先隐藏对话框  再提示修改成功
            this.getAll();
            this.dialogFormVisible = false;
            this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
            });  
            this.form.albunId=this.form.albumName=this.form.albumMajor=
                this.form.albumPublishtime="";
            }).catch(err =>{
            this.$message({
                showClose: true,
                message: '修改失败',
                type: 'error'
            });
            this.form.albunId=this.form.albumName=this.form.albumMajor=
                this.form.albumPublishtime="";
            })
          }
      },
      getAll(){
        getInfo().then(res =>{
          console.info("success")
          this.tableData = res;
          //console.info(this.tableData);
        }).catch(err =>{
          console.info("error")
          console.info(err);
        })
      }
    },
    data() {
      return {
        form:{
            albunId: "",
            albumName: "",
            albumMajor: "",
            albumPublishtime: "",
        },
        dialogFormVisible:false,
        tableData: []
      }
    },
    created(){
      this.getAll();
    }
 }
</script>