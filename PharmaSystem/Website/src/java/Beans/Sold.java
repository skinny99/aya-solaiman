
package Beans;

import Classes.SoldP;
import DataBase.DB;
import java.sql.ResultSet;
import java.util.ArrayList;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;

@ManagedBean
@RequestScoped

public class Sold {
    ArrayList<SoldP> list = new ArrayList<SoldP>();
    public void setList(ArrayList<SoldP> list) {   this.list = list; }
    public ArrayList<SoldP> getList() {  return list; }
    
    public Sold() {
        this.display();
    }
    public void display(){
           try{
            DB dbm = new DB();
            ResultSet rs = dbm.select("select * from sell where quantity > 0" );
            list.clear();
            if(rs.next()){ // if we got data ??
                SoldP n = new SoldP();
                n.setId(rs.getInt("product_ID"));
                n.setName(rs.getString("name"));
                n.setQuantity(rs.getInt("quantity"));
                list.add(n);
                while(rs.next()){//keep get data
                    n = new SoldP();
                    n.setId(rs.getInt("product_ID"));
                    n.setName(rs.getString("name"));
                    n.setQuantity(rs.getInt("quantity"));
                    list.add(n);
                }
            }else{
               FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_INFO, "thir is no data yet.. !!", null);
               FacesContext.getCurrentInstance().addMessage(null,  facesMessage);
            }
            dbm.releaseResources();
        }catch(Exception ex) {
            String  message = ex.getMessage();
            FacesMessage facesMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, message, null);
            FacesContext.getCurrentInstance().addMessage(null,  facesMessage);
        }
    }

}
