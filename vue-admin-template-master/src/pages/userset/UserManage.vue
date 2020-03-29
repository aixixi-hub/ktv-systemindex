<template>
  <div class="Userdata">
      <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="userId"
      label="用户编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户名字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="userPwd"
      label="用户密码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="level"
      label="用户星级"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="用户电话"
      width="180">
    </el-table-column>
    <el-table-column
      prop="creattime"
      label="用户创建时间"
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
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :title="修改用户个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户编号">
         <el-input v-model="form.userId" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名字">
         <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
         <el-input v-model="form.userPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户星级">
         <el-input v-model="form.level" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户电话">
         <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户创建时间">
         <el-input v-model="form.creattime" autocomplete="off" :disabled="true"></el-input>
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

import {selectAll,update} from '@/api/userset';

  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 0) {
          return 'warning-row';
        } 
          return 'success-row';
      },
      showEditPage(index,row){
        this.form.userId=row.userId;
        this.form.userName=row.userName;
        this.form.userPwd=row.userPwd;
        this.form.level=row.level;
        this.form.phone=row.phone;
        this.form.creattime=row.creattime;
        this.dialogFormVisible=true;
      },
      edit(){
        update(this.form).then(res =>{
          // 先隐藏对话框  再提示修改成功
          this.getAll();
          this.dialogFormVisible = false;
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          });  
          this.form.userId=this.form.userName=this.form.userPwd=
            this.form.level=this.form.phone=this.creattime="";
        }).catch(err =>{
          this.$message({
            showClose: true,
            message: '修改失败',
            type: 'error'
          });
          this.form.userId=this.form.userName=this.form.userPwd=
            this.form.level=this.form.phone=this.creattime="";
        })
      },
      getAll(){
        selectAll().then(res =>{
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
            userId: "",
            userName: "",
            userPwd: "",
            level: "",
            phone: "",
            creattime: "",
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