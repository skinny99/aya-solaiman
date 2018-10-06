package Classes;

public class Products {
    private int id;
    private String name;
    private float price;
    private String exdate;
    private int quantity;

    public Products() {   }

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
    
}
