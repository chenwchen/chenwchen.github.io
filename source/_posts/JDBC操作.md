---
title: JDBC操作
tags:
  - jdbc
  - Java
categories:
  - Java
abbrlink: 3095837503
date: 2019-03-20 17:22:07
---

Java连接数据库是学习java必备的知识。连接数据库分为注册驱动、链接数据库、取数据、关闭数据库,本文简单的分析一下数据的创建和数据库中数据的查询。
<!-- more -->

## 驱动注册
```java 
Class.forName("com.mysql.cj.jdbc.Driver");
```

## 数据库URL
>可能会导致客服端和数据库的时间不一样，把服务器的时间设为UTC

```java
mysql     jdbc:mysql://localhost:3306/person?serverTimezone=UTC
oracle    jdbc:oracle:thin:@localhost:1521:orcl
sqlserver jdbc:sqlserver://localhost:1433
```
## 数据库的操作

```java
    CREATE DATABASE person;
    USE person;
    CREATE TABLE Student(
    	ID INT(10);
    	Name VARCHAR(10);
    	Class INT(5),
    	Address VARCHAR(10),
    	PRIMARY KEY(ID)
    );
```

## 在Java上进行对数据库的查询输出操作

```java
import java.sql.Connection;
import java.sql.Statement;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;
public class DataBase{
	public Datase(){
		try{
			Class.forName("com.mysql.cj.jdbc.Driver");
			System.out.println("驱动注册成功");
		}catch(ClassNotFoundException e){
   			System.out.println("驱动注册出错，请检查........");
			e.printStackTrace();
		}//驱动注册部分
		try{

			String url = "jdbc:mysql://localhost:3306/person?serverTimezone=UTC";
			String user = "root";
			String password = "123";
			Connection con = DriverManager.getConnection(url,user,password);		
			System.out.println("数据库连接成功");
			try{
				Statement sql = con.createStatement();
				ResultSet result = sql.executeQuery("SELECT *FROM STUDENT");
				System.out.println("ID\t\tName\t\tClass\t\tAddress");
			                   while(result.next()){
					System.out.print(result.getString("ID")+"\t"+result.getString("Name")+"\t\t");
					System.out.println(result.getString("Class")+"\t\t"+result.getString("Address"));
				}//导出查询操作在数据库里面的信息			

			}catch(SQLException e){
				System.out.println("数据库查询部分出错，请检查..........");
				e.printStackTrace();
			}
		}catch(SQLException e){
			System.out.println("数据库连接出错，请检查...........");
			e.printStackTrace();
		}//登陆数据库部分
	}
	public static void main(String[] args){
		new DataBase();
	}
}

```


