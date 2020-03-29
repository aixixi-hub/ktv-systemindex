<template>
  <div class="Userdata">
    <el-button type="increase" @click="showAddPage()" plain>新增演唱信息</el-button>
      <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="lkmId"
      label="演唱编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="singerId"
      label="歌手编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="songerId"
      label="歌曲编号"
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
        <el-form-item label="演唱编号">
         <el-input v-model="form.lkmId" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="歌手编号">
         <el-input v-model="form.singerId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌曲编号">
         <el-input v-model="form.songerId" autocomplete="off"></el-input>
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

import {deleteById,getInfo,update,add} from '@/api/singer/linkset';

  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 0) {
          return 'warning-row';
        } 
          return 'success-row';
      },
      showEditPage(index,row){
        this.flag = "编辑演唱信息";
        this.form.lkmId=row.lkmId;
        this.form.singerId=row.singerId;
        this.form.songerId=row.songerId;
        this.dialogFormVisible=true;
      },
      showAddPage(){
          this.flag="新增一个演唱";
          this.dialogFormVisible=true;
      },
      handleDelete(index,row){
          deleteById({id:row.lkmId}).then(res =>{
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
          if(this.flag === "新增一个演唱"){
            add(this.form).then(res =>{
            // 先隐藏对话框  再提示添加成功
            this.getAll();
            this.dialogFormVisible = false;
            this.$message({
                showClose: true,
                message: '新增成功',
                type: 'success'
            });  
            this.form.lkmId=this.form.singerId=this.form.songerId="";   
            }).catch(err =>{
            this.$message({
                showClose: true,
                message: '新增失败',
                type: 'error'
            });
            this.form.lkmId=this.form.singerId=this.form.songerId="";  
            })
          }else if(this.flag === "编辑演唱信息"){
            update(this.form).then(res =>{
            // 先隐藏对话框  再提示修改成功
            this.getAll();
            this.dialogFormVisible = false;
            this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
            });  
            this.form.lkmId=this.form.singerId=this.form.songerId="";
            }).catch(err =>{
            this.$message({
                showClose: true,
                message: '修改失败',
                type: 'error'
            });
            this.form.lkmId=this.form.singerId=this.form.songerId="";
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
            lkmId: "",
            singerId: "",
            songerId: "",
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