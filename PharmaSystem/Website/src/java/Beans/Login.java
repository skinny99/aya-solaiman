
package Beans;

import DataBase.DB;
import java.sql.ResultSet;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;


@ManagedBean
@RequestScoped

public class Login {
    private String user;
    private String pass;

    public void setUser(String user) { this.user = user; }
    public void setPass(String pass) { this.pass = pass;  }
    public String getUser() {   return user; }
    public String getPass() {   return pass; }
    
    public Login() { }
    
    public String DoLogin(){
        try {
            DB dbm =  new DB();
            ResultSet rs = dbm.select("select * from Users where username='"+user+"' and password='"+pass+"'" );
            boolean found = rs.next();
            if(!found){
                dbm.releaseResources();
                throw new Exception("check your entered data..");
            }else if(rs.getInt("approved")==0){
                dbm.releaseResources();
                throw new Exception("You are no autherized to access the system ..");
            }
            dbm.releaseResources();
        }catch(Exception ex) {
            String  message = ex.getMessage();
            FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, message, null);
            FacesContext.getCurrentInstance().addMessage(null,  facesMessage);
            return "Failure";
        }
        return "Success";
    }
    
}
