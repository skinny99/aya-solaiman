
package Beans;

import DataBase.DB;
import java.text.SimpleDateFormat;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;

@ManagedBean
@RequestScoped

public class AddProducts {
    private int id;
    private String name;
    private float price;
    private String exdate;
    private int quantity;
    
    public int getId() {  return id; }
    public String getName() {  return name;  }
    public float getPrice() { return price;  }
    public String getExdate() {  return exdate;  }
    public int getQuantity() {  return quantity;   }

    public void setId(int id) {  this.id = id; }
    public void setName(String name) {   this.name = name; }
    public void setPrice(float price) {  this.price = price;  }
    public void setExdate(String exdate) {  this.exdate = exdate;  }
    public void setQuantity(int quantity) { this.quantity = quantity;  }
    
    public AddProducts() {   }
    
    public void DoADD(){
        try{
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); // your template here
            java.util.Date dateStr = formatter.parse(exdate);
            java.sql.Date dateDB = new java.sql.Date(dateStr.getTime());
            DB dbm = new DB();
            dbm.nonSelect("INSERT into Product (ID ,name ,price ,expiration_date ,quantity) values('"+id+"','"+name+"','"+price+"','"+dateDB+"','"+quantity+"')" );
            dbm.nonSelect("INSERT into sell (product_ID ,name ,quantity) values('"+id+"','"+name+"','0')" );
            dbm.releaseResources();
             FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_INFO, "Success", null);
            FacesContext.getCurrentInstance().addMessage(null,  facesMessage);
        }catch(Exception ex) {
            String  message = ex.getMessage();
            FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, message, null);
            FacesContext.getCurrentInstance().addMessage(null,  facesMessage);
        }
    }
}
