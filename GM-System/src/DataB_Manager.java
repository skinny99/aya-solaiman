/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author zorin99
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.swing.JOptionPane;

public class DataB_Manager{

    Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;
    String URL;
//    String user = "jsf";
//    String password = "jsf";
   

    public DataB_Manager(String DB_URL) {
       // throw new UnsupportedOperationException(URL);
       URL = DB_URL;
    }
    
    public void createConnection() throws Exception
    {
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        conn = DriverManager.getConnection(URL);
//        conn = DriverManager.getConnection(URL,user,password);
    }
    
    
    public void releaseResources()throws Exception
    {
        if(stmt != null) stmt.close();
        if(conn != null ) conn.close();
        if(rs!= null) rs.close();
    }
    
    public ResultSet select (String Q)throws Exception
    {
        try
        {
            createConnection();
            stmt = conn.createStatement();
            rs=stmt.executeQuery(Q);
            return rs;
        }
        catch(Exception ex)
        {
            JOptionPane.showMessageDialog(null, ex.toString());
            return null;
        }
        
    }
    
    
    public void update(String Q)throws Exception
    {
        try{
            createConnection();
            stmt = conn.createStatement();
            stmt.execute(Q);
        }
        catch(Exception ex)
        {
            JOptionPane.showMessageDialog(null, ex.toString());
        }
        finally
        {
            if(stmt != null) stmt.close();
            if(conn != null) conn.close();
        }
        
    }
    
    public void insert (String Q)throws Exception
    {
        try{
            createConnection();
            stmt = conn.createStatement();
            stmt.execute(Q);
        }
        catch(Exception ex)
        {
            JOptionPane.showMessageDialog(null, ex.toString());
        }
        finally
        {
            if(stmt != null) stmt.close();
            if(conn != null) conn.close();
        }
    }
    
    public void delete (String Q)throws Exception
    {
        try{
            createConnection();
            stmt = conn.createStatement();
            stmt.execute(Q);
        }
        catch(Exception ex)
        {
            JOptionPane.showMessageDialog(null, ex.toString());
        }
        finally
        {
            if(stmt != null) stmt.close();
            if(conn != null) conn.close();
        }
    }
    
    
    
    
}
