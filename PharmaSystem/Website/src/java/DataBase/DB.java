package DataBase;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DB {

    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private String URL ="jdbc:mysql://localhost:3306/jsf";
    private String USER ="jsf";
    private String PASS ="jsf";

    public DB() {}
    public DB(String url,String u,String p) {  URL =url; USER=u; PASS=p;}
    public void createConnection() throws Exception{
        Class.forName("com.mysql.jdbc.Driver");
        conn = DriverManager.getConnection(URL, USER, PASS); //connect to DB
    }
    public void releaseResources()throws Exception{
        if(stmt != null) stmt.close();
        if(conn != null ) conn.close();
        if(rs!= null) rs.close();
    }
    public ResultSet select (String Q)throws Exception{
            createConnection();
            stmt = conn.createStatement();
            rs=stmt.executeQuery(Q);
            return rs;
    }
    public void nonSelect(String Q)throws Exception{
            createConnection();
            stmt = conn.createStatement();
            stmt.execute(Q);
            if(stmt != null) stmt.close();
            if(conn != null) conn.close();       
    }
}
