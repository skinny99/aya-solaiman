
package Beans;

import DataBase.DB;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;

@ManagedBean
@RequestScoped

public class Signup {
    private String user;
    private String pass;
    private String email;
    private String mobile;
    private int sex;

    public Signup() {   }

    public void setUser(String user) {    this.user = user;   }
    public void setPass(String pass) {    this.pass = pass;  }
    public void setEmail(String email) {  this.email = email; }
    public void setMobile(String mobile) {  this.mobile = mobile;   }
    public void setSex(int sex) {     this.sex = sex;   }

    public String getUser() {  return user;  }
    public String getPass() {   return pass;  }
    public String getEmail() {    return email;   }
    public String getMobile() {   return mobile;  }
    public int getSex() {   return sex;  }
    
    public void DoValidation() throws Exception{
        if(!user.matches("^[a-zA-Z._-]{5,}$")) //mini 5 digit a-z or A-Z or . _ -  
            throw new Exception("username is not valid .");
        else if(!pass.matches("^(?=.*[0-9])(?=.*[a-z]).{8,}$")) //mini 8 -- char and numbers 
            throw new Exception("password is not valid .");
        else if(!email.matches("^(.+)@(.+)$")) // any@any
            throw new Exception("email is not valid .");
        else if(!mobile.matches("\\d{10}")) //10 digits 
            throw new Exception("mobile is not valid .");
    }
    public String DoSignup(){
        try {
            DB dbm =  new DB();
            ///Database design forcing the user,email and mobile to make it unique so duplication will throw exception
            this.DoValidation();
            dbm.nonSelect("INSERT INTO Users ( Username ,password ,email ,mobile ,sex ) values('"+
                  user+"', '"+ pass+"','"+email+"','"+mobile+"','"+sex+"');");
            dbm.releaseResources();
            FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_INFO, "Success ..", null);
            FacesContext.getCurrentInstance().addMessage(null,  facesMessage);
        }catch(Exception ex) {
            String  message = ex.getMessage();
            FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, message, null);
            FacesContext.getCurrentInstance().addMessage(null,  facesMessage);
            return "Failure";
        }
        return "Success";
    }
}
