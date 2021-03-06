
package Beans;

import Classes.Products;
import DataBase.DB;
import java.sql.ResultSet;
import java.util.ArrayList;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;

@ManagedBean
@RequestScoped

public class Home {
    ArrayList<Products> list = new ArrayList<Products>();

    public void setList(ArrayList<Products> list) {   this.list = list; }
    public ArrayList<Products> getList() {  return list; }
    
    public Home() {
        try{
            DB dbm = new DB();
            ResultSet rs = dbm.select("select * from Product" );
            if(rs.next()){ // if we got data ??
                Products n = new Products();
                n.setId(rs.getInt("ID"));
                n.setName(rs.getString("name"));
                n.setPrice(rs.getFloat("price"));
                n.setExdate(rs.getString("expiration_date"));
                n.setQuantity(rs.getInt("quantity"));
                list.add(n);
                while(rs.next()){//keep get data
                    n = new Products();
                    n.setId(rs.getInt("ID"));
                    n.setName(rs.getString("name"));
                    n.setPrice(rs.getFloat("price"));
                    n.setExdate(rs.getString("expiration_date"));
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
