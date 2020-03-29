<template>
  <div class="Userdata">
    <el-button type="increase" @click="showAddPage()" plain>新增歌手</el-button>
      <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="singerId"
      label="歌手编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="singerName"
      label="歌手名字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="singerGender"
      label="歌手性别"
      width="180">
    </el-table-column>
    <el-table-column
      prop="singerCategory"
      label="歌手类型"
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
        <el-form-item label="歌手编号">
         <el-input v-model="form.singerId" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="歌手名字">
         <el-input v-model="form.singerName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌手性别">
         <el-input v-model="form.singerGender" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌手类型">
         <el-input v-model="form.singerCategory" autocomplete="off"></el-input>
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

import {deleteById,getInfo,update,add} from '@/api/singer/singerset';

  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 0) {
          return 'warning-row';
        } 
          return 'success-row';
      },
      showEditPage(index,row){
        this.flag = "编辑歌手信息";
        this.form.kehuId=row.kehuId;
        this.form.kehuName=row.kehuName;
        this.form.kehuLevel=row.kehuLevel;
        this.form.kehuAddress=row.kehuAddress;
        this.form.kehuPhone=row.kehuPhone;
        this.form.kehuCreattime=row.kehuCreattime;
        this.dialogFormVisible=true;
      },
      showAddPage(){
          this.flag="新增一个歌手";
          this.dialogFormVisible=true;
      },
      handleDelete(index,row){
          deleteById({id:row.singerId}).then(res =>{
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
          if(this.flag === "新增一个歌手"){
            add(this.form).then(res =>{
            // 先隐藏对话框  再提示添加成功
            this.getAll();
            this.dialogFormVisible = false;
            this.$message({
                showClose: true,
                message: '新增成功',
                type: 'success'
            });  
            this.form.singerId=this.form.singerName=this.form.singerGender=
                this.form.singerCategory="";    
            }).catch(err =>{
            this.$message({
                showClose: true,
                message: '新增失败',
                type: 'error'
            });
            this.form.singerId=this.form.singerName=this.form.singerGender=
                this.form.singerCategory="";  
            })
          }else if(this.flag === "编辑歌手信息"){
            update(this.form).then(res =>{
            // 先隐藏对话框  再提示修改成功
            this.getAll();
            this.dialogFormVisible = false;
            this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
            });  
            this.form.singerId=this.form.singerName=this.form.singerGender=
                this.form.singerCategory="";
            }).catch(err =>{
            this.$message({
                showClose: true,
                message: '修改失败',
                type: 'error'
            });
            this.form.singerId=this.form.singerName=this.form.singerGender=
                this.form.singerCategory="";
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
            singerId: "",
            singerName: "",
            singerGender: "",
            singerCategory: "",
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