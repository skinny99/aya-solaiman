
package Beans;

import Classes.Products;
import DataBase.DB;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ValueChangeEvent;

@ManagedBean
@RequestScoped
public class UpdateProducts {
    
    private int newProductid ;
    static private int tempid;
    private String newName ;
    private float newPrice ;
    private String newExate ;
    private int newQuantity ;

    public int getNewProductid() {return newProductid;}
    public String getNewName() {  return newName;  }
    public float getNewPrice() {  return newPrice; }
    public String getNewExate() { return newExate; }
    public int getNewQuantity() {  return newQuantity; }

    public void setNewProductid(int newProductid) {    this.newProductid = newProductid;  }
    public void setNewName(String newName) {    this.newName = newName;  }
    public void setNewPrice(float newPrice) {   this.newPrice = newPrice;  }
    public void setNewExate(String newExate) {  this.newExate = newExate;  }
    public void setNewQuantity(int newQuantity) {   this.newQuantity = newQuantity;  }
    
    public UpdateProducts() {
    }  

    public void DoUpdate(){
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); // your template here
            java.util.Date dateStr = formatter.parse(this.newExate);
            java.sql.Date dateDB = new java.sql.Date(dateStr.getTime());
            DB dbm = new DB();
            dbm.nonSelect("UPDATE Product set ID=" + this.newProductid +",name='"+this.newName +
                    "',price=" + this.newPrice + " ,expiration_date='" +
                    dateDB + "',quantity=" + this.newQuantity +" where ID="+this.tempid+";");
            dbm.nonSelect("UPDATE sell set product_ID=" + this.newProductid +",name='" + this.newName
                    +"' where product_ID=" + this.tempid+";");
            dbm.releaseResources();
            FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_INFO, "Success", null);
            FacesContext.getCurrentInstance().addMessage(null, facesMessage);
        } catch (Exception ex) {
            FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, ex.getMessage(), null);
            FacesContext.getCurrentInstance().addMessage(null, facesMessage);

        }

    }
    public String get() {
        try {
            DB dbm = new DB();
            ResultSet rs =  dbm.select("select * from Product where ID='"+this.newProductid+"'");
            this.tempid = this.newProductid;
            if(rs.next()){
                this.setNewProductid(rs.getInt("ID"));
                this.setNewName(rs.getString("name"));
                this.setNewPrice(rs.getFloat("price"));
                this.setNewExate(rs.getString("expiration_date"));
                this.setNewQuantity(rs.getInt("quantity"));
            }else{
                throw new Exception("entred id not found");
            }
            dbm.releaseResources();
        } catch (Exception ex) {
            FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, ex.getMessage(), null);
            FacesContext.getCurrentInstance().addMessage(null, facesMessage);
            return "Failure";
        }
        return "Success";
    }
}
