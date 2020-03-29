<template>
  <div class="Userdata">
    <el-button type="increase" @click="showAddPage()" plain>新增客户</el-button>
      <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="kehuId"
      label="客户编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="kehuName"
      label="客户名字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="kehuLevel"
      label="客户星级"
      width="180">
    </el-table-column>
    <el-table-column
      prop="kehuAddress"
      label="客户地址"
      width="180">
    </el-table-column>
    <el-table-column
      prop="kehuPhone"
      label="客户电话"
      width="180">
    </el-table-column>
    <el-table-column
      prop="kehuCreattime"
      label="客户创建时间"
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
        <el-form-item label="客户编号">
         <el-input v-model="form.kehuId" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户名字">
         <el-input v-model="form.kehuName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户星级">
         <el-input v-model="form.kehuLevel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户地址">
         <el-input v-model="form.kehuAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户电话">
         <el-input v-model="form.kehuPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户创建时间">
         <el-input v-model="form.kehuCreattime" autocomplete="off" :disabled="true"></el-input>
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

import {deleteById,getInfo,update,add} from '@/api/kehuset';

  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 0) {
          return 'warning-row';
        } 
          return 'success-row';
      },
      showEditPage(index,row){
        this.flag = "编辑客户信息";
        this.form.kehuId=row.kehuId;
        this.form.kehuName=row.kehuName;
        this.form.kehuLevel=row.kehuLevel;
        this.form.kehuAddress=row.kehuAddress;
        this.form.kehuPhone=row.kehuPhone;
        this.form.kehuCreattime=row.kehuCreattime;
        this.dialogFormVisible=true;
      },
      showAddPage(){
          this.flag="新增一个客户";
          this.dialogFormVisible=true;
      },
      handleDelete(index,row){
          deleteById({id:row.kehuId}).then(res =>{
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
          if(this.flag === "新增一个客户"){
            add(this.form).then(res =>{
            // 先隐藏对话框  再提示添加成功
            this.getAll();
            this.dialogFormVisible = false;
            this.$message({
                showClose: true,
                message: '新增成功',
                type: 'success'
            });  
            this.form.kehuId=this.form.kehuName=this.form.kehuLevel=this.form.kehuAddress
                    =this.form.kehuPhone=this.form.kehuCreattime="";    
            }).catch(err =>{
            this.$message({
                showClose: true,
                message: '新增失败',
                type: 'error'
            });
            this.form.kehuId=this.form.kehuName=this.form.kehuLevel=this.form.kehuAddress
                    =this.form.kehuPhone=this.form.kehuCreattime="";  
            })
          }else if(this.flag === "编辑客户信息"){
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
            kehuId: "",
            kehuName: "",
            kehuLevel: "",
            kehuAddress: "",
            kehuPhone: "",
            kehuCreattime: "",
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