
import java.sql.ResultSet;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Vector;
import javax.swing.JOptionPane;
import javax.swing.table.DefaultTableModel;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author zorin99
 */
public class MainForm extends javax.swing.JFrame {
    LoginForm loginform;
    static final String URL ="jdbc:sqlserver://serverName:[PortNumber];databaseName=value;user=value;";
    DataB_Manager dbm = new DataB_Manager(URL);
    ResultSet rs = null;
    /**
     * 
     * Creates new form MainForm
     */
    public MainForm() {
        initComponents();
        currentDate();
        updateClasses();
    updateSClasses();
     updateRoom();
    updateREqu();
     updateSEqui();
     updateTrainee();
     updateStaff();
    }
    public MainForm(LoginForm logform){
        this();
        loginform = logform;
         updateClasses();
    updateSClasses();
     updateRoom();
    updateREqu();
     updateSEqui();
     updateTrainee();
     updateStaff();
    }
    private void currentDate (){
        
        Calendar cal =new GregorianCalendar();
        int month = cal.get(Calendar.MONTH);
        int year = cal.get(Calendar.YEAR);
        int day = cal.get(Calendar.DAY_OF_MONTH);
        
        DateLabel.setText((month+1)+"/"+day+"/"+year);
        
        //Time
      
        int second = cal.get(Calendar.SECOND);
        int minute = cal.get(Calendar.MINUTE);
        int hour = cal.get(Calendar.HOUR);
        
        TimeLabel.setText(hour+":"+(minute)+":"+second);
        
       
    }
    private void updateClasses(){
        String selectQuery ="select * from classes";
        Vector colNames = new Vector();
        try{
            rs = dbm.select(selectQuery);
            int columns = rs.getMetaData().getColumnCount();
            for(int i=1;i<=columns;i++)
                colNames.addElement(rs.getMetaData().getColumnName(i));
            Vector data = new Vector();
            while(rs.next()){
                Vector row = new Vector();
                for(int i=1;i<=columns;i++)
                    row.addElement(rs.getObject(i));
                data.addElement(row);
            }
            Classtable.setModel(new DefaultTableModel(data,colNames));
        }
        catch(Exception ex){
            JOptionPane.showMessageDialog(null, ex.getMessage());
        }
        finally {
            
            try{
                dbm.releaseResources();
            }
            catch(Exception e){}
        }
    
    
    
    
    }
    private void updateSClasses(){}
    private void updateRoom(){
        String selectQuery ="select * from room";
        Vector colNames = new Vector();
        try{
            rs = dbm.select(selectQuery);
            int columns = rs.getMetaData().getColumnCount();
            for(int i=1;i<=columns;i++)
                colNames.addElement(rs.getMetaData().getColumnName(i));
            Vector data = new Vector();
            while(rs.next()){
                Vector row = new Vector();
                for(int i=1;i<=columns;i++)
                    row.addElement(rs.getObject(i));
                data.addElement(row);
            }
            Roomtable.setModel(new DefaultTableModel(data,colNames));
        }
        catch(Exception ex){
            JOptionPane.showMessageDialog(null, ex.getMessage());
        }
        finally {
            
            try{
                dbm.releaseResources();
            }
            catch(Exception e){}
        }
    
    }
    private void updateREqu(){
        String selectQuery ="select * from room_equ";
        Vector colNames = new Vector();
        try{
            rs = dbm.select(selectQuery);
            int columns = rs.getMetaData().getColumnCount();
            for(int i=1;i<=columns;i++)
                colNames.addElement(rs.getMetaData().getColumnName(i));
            Vector data = new Vector();
            while(rs.next()){
                Vector row = new Vector();
                for(int i=1;i<=columns;i++)
                    row.addElement(rs.getObject(i));
                data.addElement(row);
            }
            REtable.setModel(new DefaultTableModel(data,colNames));
        }
        catch(Exception ex){
            JOptionPane.showMessageDialog(null, ex.getMessage());
        }
        finally {
            
            try{
                dbm.releaseResources();
            }
            catch(Exception e){}
        }
    
    
    
    
    
    
    }
    private void updateSEqui(){
        String selectQuery ="select * from staff_equ";
        Vector colNames = new Vector();
        try{
            rs = dbm.select(selectQuery);
            int columns = rs.getMetaData().getColumnCount();
            for(int i=1;i<=columns;i++)
                colNames.addElement(rs.getMetaData().getColumnName(i));
            Vector data = new Vector();
            while(rs.next()){
                Vector row = new Vector();
                for(int i=1;i<=columns;i++)
                    row.addElement(rs.getObject(i));
                data.addElement(row);
            }
            SEtable.setModel(new DefaultTableModel(data,colNames));
        }
        catch(Exception ex){
            JOptionPane.showMessageDialog(null, ex.getMessage());
        }
        finally {
            
            try{
                dbm.releaseResources();
            }
            catch(Exception e){}
        }
            
    
    }
    private void updateTrainee(){
        String selectQuery ="select * from trainees";
        Vector colNames = new Vector();
        try{
            rs = dbm.select(selectQuery);
            int columns = rs.getMetaData().getColumnCount();
            for(int i=1;i<=columns;i++)
                colNames.addElement(rs.getMetaData().getColumnName(i));
            Vector data = new Vector();
            while(rs.next()){
                Vector row = new Vector();
                for(int i=1;i<=columns;i++)
                    row.addElement(rs.getObject(i));
                data.addElement(row);
            }
            TraineeTable.setModel(new DefaultTableModel(data,colNames));
        }
        catch(Exception ex){
            JOptionPane.showMessageDialog(null, ex.getMessage());
        }
        finally {
            
            try{
                dbm.releaseResources();
            }
            catch(Exception e){}
        }
   
    }
    private void updateStaff(){
        String selectQuery ="select * from staff";
        Vector colNames = new Vector();
        try{
            rs = dbm.select(selectQuery);
            int columns = rs.getMetaData().getColumnCount();
            for(int i=1;i<=columns;i++)
                colNames.addElement(rs.getMetaData().getColumnName(i));
            Vector data = new Vector();
            while(rs.next()){
                Vector row = new Vector();
                for(int i=1;i<=columns;i++)
                    row.addElement(rs.getObject(i));
                data.addElement(row);
            }
            StaffTable.setModel(new DefaultTableModel(data,colNames));
        }
        catch(Exception ex){
            JOptionPane.showMessageDialog(null, ex.getMessage());
        }
        finally {
            
            try{
                dbm.releaseResources();
            }
            catch(Exception e){}
        }
   
    }
    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jTabbedPane1 = new javax.swing.JTabbedPane();
        jPanel2 = new javax.swing.JPanel();
        jPanel6 = new javax.swing.JPanel();
        FNameLabel = new javax.swing.JLabel();
        LNameLabel = new javax.swing.JLabel();
        DoBLabel = new javax.swing.JLabel();
        FNameTxtField = new javax.swing.JTextField();
        LNameTxtField = new javax.swing.JTextField();
        DoBTxtField = new javax.swing.JTextField();
        jPanel9 = new javax.swing.JPanel();
        EmailLabel = new javax.swing.JLabel();
        EmailTxtField = new javax.swing.JTextField();
        AddressLabel = new javax.swing.JLabel();
        AddressTxtField = new javax.swing.JTextField();
        PhoneLabel = new javax.swing.JLabel();
        PhoneTxtField = new javax.swing.JTextField();
        TraineeJoinDLabel = new javax.swing.JLabel();
        TraineeJoinDTxtField = new javax.swing.JTextField();
        MembershipLabel = new javax.swing.JLabel();
        TraineeIDLabel = new javax.swing.JLabel();
        TraineeIDTxtField = new javax.swing.JTextField();
        TraineeUpdate = new javax.swing.JButton();
        TraineeFieldsClear = new javax.swing.JButton();
        TraineeInsert = new javax.swing.JButton();
        TraineeDelete = new javax.swing.JButton();
        MemberCostLabel = new javax.swing.JLabel();
        MemberCostTxtField = new javax.swing.JTextField();
        MemberTxtField = new javax.swing.JTextField();
        jLabel1 = new javax.swing.JLabel();
        EDataTxtField = new javax.swing.JTextField();
        jPanel7 = new javax.swing.JPanel();
        jScrollPane1 = new javax.swing.JScrollPane();
        TraineeTable = new javax.swing.JTable();
        jPanel8 = new javax.swing.JPanel();
        TraineeID = new javax.swing.JLabel();
        JTraineeSearchArea = new javax.swing.JTextField();
        jPanel1 = new javax.swing.JPanel();
        jPanel10 = new javax.swing.JPanel();
        jScrollPane2 = new javax.swing.JScrollPane();
        StaffTable = new javax.swing.JTable();
        jPanel5 = new javax.swing.JPanel();
        StaffFNameLabel = new javax.swing.JLabel();
        StaffLNameLabel = new javax.swing.JLabel();
        StaffDoBLabel = new javax.swing.JLabel();
        StaffGenderLabel = new javax.swing.JLabel();
        StaffFNTxtField = new javax.swing.JTextField();
        StaffLNTxtField = new javax.swing.JTextField();
        StaffDoBTxtField = new javax.swing.JTextField();
        jPanel12 = new javax.swing.JPanel();
        StaffEmailLabel = new javax.swing.JLabel();
        StaffAddressLabel = new javax.swing.JLabel();
        StaffPhoneLabel = new javax.swing.JLabel();
        StaffEmailTxtField = new javax.swing.JTextField();
        StaffAddressTxtField = new javax.swing.JTextField();
        StaffPhoneTxtField = new javax.swing.JTextField();
        jPanel13 = new javax.swing.JPanel();
        StaffStartLable = new javax.swing.JLabel();
        StaffEndLabel = new javax.swing.JLabel();
        StaffStartTxtField = new javax.swing.JTextField();
        StaffEndTxtField = new javax.swing.JTextField();
        SatffDivTxtField = new javax.swing.JTextField();
        StaffDivisionLabel = new javax.swing.JLabel();
        SalaryLabel = new javax.swing.JLabel();
        SalaryTxtField = new javax.swing.JTextField();
        jLabel2 = new javax.swing.JLabel();
        DofworkTxtField = new javax.swing.JTextField();
        jLabel3 = new javax.swing.JLabel();
        StaffIDTxtField = new javax.swing.JTextField();
        StaffUpdate = new javax.swing.JButton();
        StaffInsert = new javax.swing.JButton();
        StaffFieldClear = new javax.swing.JButton();
        SatffDelete = new javax.swing.JButton();
        SGenderTxtField = new javax.swing.JTextField();
        jPanel11 = new javax.swing.JPanel();
        StaffIDSearchLabel = new javax.swing.JLabel();
        StaffIDSearchTxtField = new javax.swing.JTextField();
        jPanel4 = new javax.swing.JPanel();
        jPanel16 = new javax.swing.JPanel();
        jScrollPane5 = new javax.swing.JScrollPane();
        REtable = new javax.swing.JTable();
        jPanel17 = new javax.swing.JPanel();
        jScrollPane6 = new javax.swing.JScrollPane();
        SEtable = new javax.swing.JTable();
        jPanel3 = new javax.swing.JPanel();
        jPanel14 = new javax.swing.JPanel();
        jScrollPane3 = new javax.swing.JScrollPane();
        Classtable = new javax.swing.JTable();
        jPanel15 = new javax.swing.JPanel();
        jScrollPane4 = new javax.swing.JScrollPane();
        Roomtable = new javax.swing.JTable();
        Logout = new javax.swing.JButton();
        jMenuBar1 = new javax.swing.JMenuBar();
        TimeLabel = new javax.swing.JMenu();
        DateLabel = new javax.swing.JMenu();
        WelcomeLabel = new javax.swing.JMenu();
        AdminName = new javax.swing.JMenu();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        jTabbedPane1.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "System Manager", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Dialog", 3, 14))); // NOI18N

        jPanel6.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "Trainee Information", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Dialog", 3, 15), new java.awt.Color(204, 12, 7))); // NOI18N

        FNameLabel.setText("First Name:");
        FNameLabel.setMaximumSize(new java.awt.Dimension(79, 20));
        FNameLabel.setMinimumSize(new java.awt.Dimension(79, 20));

        LNameLabel.setText("Last Name:");

        DoBLabel.setText("Date of Birth:");

        FNameTxtField.setMaximumSize(new java.awt.Dimension(15, 28));
        FNameTxtField.setMinimumSize(new java.awt.Dimension(15, 28));
        FNameTxtField.setPreferredSize(new java.awt.Dimension(15, 28));

        jPanel9.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "Contact Info:", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Dialog", 3, 14), new java.awt.Color(204, 12, 7))); // NOI18N

        EmailLabel.setText("Email:");

        AddressLabel.setText("Address:");

        PhoneLabel.setText("Phone Number:");

        javax.swing.GroupLayout jPanel9Layout = new javax.swing.GroupLayout(jPanel9);
        jPanel9.setLayout(jPanel9Layout);
        jPanel9Layout.setHorizontalGroup(
            jPanel9Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel9Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel9Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel9Layout.createSequentialGroup()
                        .addComponent(EmailLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 52, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(EmailTxtField))
                    .addGroup(jPanel9Layout.createSequentialGroup()
                        .addComponent(AddressLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 70, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(AddressTxtField))
                    .addGroup(jPanel9Layout.createSequentialGroup()
                        .addComponent(PhoneLabel)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(PhoneTxtField, javax.swing.GroupLayout.DEFAULT_SIZE, 315, Short.MAX_VALUE)
                        .addGap(6, 6, 6)))
                .addContainerGap(59, Short.MAX_VALUE))
        );
        jPanel9Layout.setVerticalGroup(
            jPanel9Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel9Layout.createSequentialGroup()
                .addGroup(jPanel9Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(EmailLabel)
                    .addComponent(EmailTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel9Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(AddressTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(AddressLabel))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel9Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(PhoneLabel)
                    .addComponent(PhoneTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(0, 11, Short.MAX_VALUE))
        );

        jPanel9Layout.linkSize(javax.swing.SwingConstants.VERTICAL, new java.awt.Component[] {AddressLabel, AddressTxtField, EmailLabel, EmailTxtField, PhoneLabel, PhoneTxtField});

        TraineeJoinDLabel.setText("Join Date:");

        MembershipLabel.setText("Membership Type:");

        TraineeIDLabel.setText("Trainee ID:");

        TraineeUpdate.setIcon(new javax.swing.ImageIcon("/home/zorin99/NetBeansProjects/update icon.png")); // NOI18N
        TraineeUpdate.setText("Update");
        TraineeUpdate.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                TraineeUpdateActionPerformed(evt);
            }
        });

        TraineeFieldsClear.setIcon(new javax.swing.ImageIcon("/home/zorin99/NetBeansProjects/erase-128.png")); // NOI18N
        TraineeFieldsClear.setText("Clear");
        TraineeFieldsClear.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                TraineeFieldsClearActionPerformed(evt);
            }
        });

        TraineeInsert.setIcon(new javax.swing.ImageIcon("/home/zorin99/NetBeansProjects/Save-icon.png")); // NOI18N
        TraineeInsert.setText("Add");
        TraineeInsert.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                TraineeInsertActionPerformed(evt);
            }
        });

        TraineeDelete.setIcon(new javax.swing.ImageIcon(getClass().getResource("/delete.png"))); // NOI18N
        TraineeDelete.setText("Delete");
        TraineeDelete.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                TraineeDeleteActionPerformed(evt);
            }
        });

        MemberCostLabel.setText("Membership Cost: ");

        jLabel1.setText("End:");

        javax.swing.GroupLayout jPanel6Layout = new javax.swing.GroupLayout(jPanel6);
        jPanel6.setLayout(jPanel6Layout);
        jPanel6Layout.setHorizontalGroup(
            jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel6Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel6Layout.createSequentialGroup()
                        .addComponent(MemberCostLabel)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(MemberCostTxtField))
                    .addGroup(jPanel6Layout.createSequentialGroup()
                        .addGroup(jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(jPanel6Layout.createSequentialGroup()
                                .addComponent(TraineeJoinDLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 84, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(TraineeJoinDTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 131, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jLabel1)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(EDataTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 204, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(jPanel6Layout.createSequentialGroup()
                                .addComponent(TraineeIDLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 84, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(TraineeIDTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 150, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(jPanel6Layout.createSequentialGroup()
                                .addComponent(FNameLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 87, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(FNameTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 129, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(12, 12, 12)
                                .addComponent(LNameLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 88, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(LNameTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 139, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addComponent(jPanel9, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addGroup(jPanel6Layout.createSequentialGroup()
                                .addComponent(TraineeUpdate, javax.swing.GroupLayout.PREFERRED_SIZE, 91, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(TraineeInsert, javax.swing.GroupLayout.PREFERRED_SIZE, 90, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(TraineeFieldsClear, javax.swing.GroupLayout.PREFERRED_SIZE, 84, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(TraineeDelete, javax.swing.GroupLayout.PREFERRED_SIZE, 90, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(jPanel6Layout.createSequentialGroup()
                                .addComponent(MembershipLabel)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(MemberTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 201, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(jPanel6Layout.createSequentialGroup()
                                .addComponent(DoBLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(DoBTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 169, javax.swing.GroupLayout.PREFERRED_SIZE)))
                        .addGap(0, 0, Short.MAX_VALUE)))
                .addContainerGap())
        );
        jPanel6Layout.setVerticalGroup(
            jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel6Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(FNameTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(LNameLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 28, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(LNameTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(FNameLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(DoBLabel)
                    .addComponent(DoBTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(42, 42, 42)
                .addComponent(jPanel9, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(TraineeJoinDLabel)
                    .addComponent(TraineeJoinDTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel1)
                    .addComponent(EDataTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(TraineeIDTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(TraineeIDLabel))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addGroup(jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(MembershipLabel)
                    .addComponent(MemberTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(MemberCostTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(MemberCostLabel))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel6Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(TraineeUpdate)
                    .addComponent(TraineeFieldsClear)
                    .addComponent(TraineeInsert)
                    .addComponent(TraineeDelete))
                .addContainerGap())
        );

        TraineeTable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        jScrollPane1.setViewportView(TraineeTable);

        javax.swing.GroupLayout jPanel7Layout = new javax.swing.GroupLayout(jPanel7);
        jPanel7.setLayout(jPanel7Layout);
        jPanel7Layout.setHorizontalGroup(
            jPanel7Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jScrollPane1, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, 401, Short.MAX_VALUE)
        );
        jPanel7Layout.setVerticalGroup(
            jPanel7Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel7Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 496, Short.MAX_VALUE))
        );

        jPanel8.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "Search", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Dialog", 3, 14), new java.awt.Color(204, 12, 7))); // NOI18N

        TraineeID.setText("Trainee ID:");

        JTraineeSearchArea.addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyReleased(java.awt.event.KeyEvent evt) {
                JTraineeSearchAreaKeyReleased(evt);
            }
        });

        javax.swing.GroupLayout jPanel8Layout = new javax.swing.GroupLayout(jPanel8);
        jPanel8.setLayout(jPanel8Layout);
        jPanel8Layout.setHorizontalGroup(
            jPanel8Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel8Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(TraineeID, javax.swing.GroupLayout.PREFERRED_SIZE, 86, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(JTraineeSearchArea)
                .addContainerGap())
        );
        jPanel8Layout.setVerticalGroup(
            jPanel8Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel8Layout.createSequentialGroup()
                .addGroup(jPanel8Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(JTraineeSearchArea, javax.swing.GroupLayout.PREFERRED_SIZE, 22, Short.MAX_VALUE)
                    .addComponent(TraineeID))
                .addGap(8, 8, 8))
        );

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(jPanel6, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jPanel8, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jPanel7, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap())
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(22, 22, 22)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jPanel7, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addComponent(jPanel8, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(jPanel6, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                .addContainerGap())
        );

        jTabbedPane1.addTab("Trainee Info & registration", jPanel2);

        StaffTable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        jScrollPane2.setViewportView(StaffTable);

        javax.swing.GroupLayout jPanel10Layout = new javax.swing.GroupLayout(jPanel10);
        jPanel10.setLayout(jPanel10Layout);
        jPanel10Layout.setHorizontalGroup(
            jPanel10Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jScrollPane2, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, 375, Short.MAX_VALUE)
        );
        jPanel10Layout.setVerticalGroup(
            jPanel10Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel10Layout.createSequentialGroup()
                .addComponent(jScrollPane2, javax.swing.GroupLayout.DEFAULT_SIZE, 548, Short.MAX_VALUE)
                .addContainerGap())
        );

        jPanel5.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "Staff Information", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Dialog", 3, 15), new java.awt.Color(204, 12, 7))); // NOI18N

        StaffFNameLabel.setText("First Name:");

        StaffLNameLabel.setText("Last Name:");

        StaffDoBLabel.setText("Date of Birth:");

        StaffGenderLabel.setText("Gender:");

        jPanel12.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "Contact Info", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Dialog", 3, 14), new java.awt.Color(204, 12, 7))); // NOI18N

        StaffEmailLabel.setText("Email:");

        StaffAddressLabel.setText("Address:");

        StaffPhoneLabel.setText("Phone Number:");

        javax.swing.GroupLayout jPanel12Layout = new javax.swing.GroupLayout(jPanel12);
        jPanel12.setLayout(jPanel12Layout);
        jPanel12Layout.setHorizontalGroup(
            jPanel12Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel12Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel12Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addGroup(jPanel12Layout.createSequentialGroup()
                        .addComponent(StaffPhoneLabel)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(StaffPhoneTxtField, javax.swing.GroupLayout.DEFAULT_SIZE, 383, Short.MAX_VALUE))
                    .addGroup(jPanel12Layout.createSequentialGroup()
                        .addGroup(jPanel12Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(StaffEmailLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 53, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(StaffAddressLabel))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(jPanel12Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(StaffEmailTxtField, javax.swing.GroupLayout.DEFAULT_SIZE, 430, Short.MAX_VALUE)
                            .addComponent(StaffAddressTxtField))))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel12Layout.setVerticalGroup(
            jPanel12Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel12Layout.createSequentialGroup()
                .addGroup(jPanel12Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(StaffEmailLabel)
                    .addComponent(StaffEmailTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 22, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel12Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(StaffAddressLabel)
                    .addComponent(StaffAddressTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 28, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel12Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(StaffPhoneTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(StaffPhoneLabel))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        jPanel13.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "Employment Info", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Dialog", 3, 14), new java.awt.Color(204, 12, 7))); // NOI18N

        StaffStartLable.setText("Start Date:");

        StaffEndLabel.setText("End Date:");

        StaffDivisionLabel.setText("Division:");

        SalaryLabel.setText("Salary:");

        jLabel2.setText("DayofWork:");

        jLabel3.setText("Staff ID:");

        javax.swing.GroupLayout jPanel13Layout = new javax.swing.GroupLayout(jPanel13);
        jPanel13.setLayout(jPanel13Layout);
        jPanel13Layout.setHorizontalGroup(
            jPanel13Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel13Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel13Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel13Layout.createSequentialGroup()
                        .addGroup(jPanel13Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(StaffStartLable, javax.swing.GroupLayout.PREFERRED_SIZE, 83, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(StaffDivisionLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 73, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(jPanel13Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(jPanel13Layout.createSequentialGroup()
                                .addComponent(StaffStartTxtField, javax.swing.GroupLayout.DEFAULT_SIZE, 166, Short.MAX_VALUE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(StaffEndLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 77, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(StaffEndTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 158, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(jPanel13Layout.createSequentialGroup()
                                .addComponent(SatffDivTxtField)
                                .addGap(18, 18, 18)
                                .addComponent(jLabel2)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(DofworkTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 170, javax.swing.GroupLayout.PREFERRED_SIZE))))
                    .addGroup(jPanel13Layout.createSequentialGroup()
                        .addComponent(SalaryLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 63, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(SalaryTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 160, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jLabel3)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(StaffIDTxtField)))
                .addContainerGap())
        );
        jPanel13Layout.setVerticalGroup(
            jPanel13Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel13Layout.createSequentialGroup()
                .addGroup(jPanel13Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(StaffStartLable)
                    .addComponent(StaffStartTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(StaffEndTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(StaffEndLabel))
                .addGap(7, 7, 7)
                .addGroup(jPanel13Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(StaffDivisionLabel)
                    .addComponent(SatffDivTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel2)
                    .addComponent(DofworkTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel13Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(SalaryLabel)
                    .addGroup(jPanel13Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                        .addComponent(SalaryTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addComponent(jLabel3)
                        .addComponent(StaffIDTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        StaffUpdate.setIcon(new javax.swing.ImageIcon("/home/zorin99/NetBeansProjects/update icon.png")); // NOI18N
        StaffUpdate.setText("Update");
        StaffUpdate.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                StaffUpdateActionPerformed(evt);
            }
        });

        StaffInsert.setIcon(new javax.swing.ImageIcon("/home/zorin99/NetBeansProjects/Save-icon.png")); // NOI18N
        StaffInsert.setText("Add");
        StaffInsert.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                StaffInsertActionPerformed(evt);
            }
        });

        StaffFieldClear.setIcon(new javax.swing.ImageIcon(getClass().getResource("/erase-128.png"))); // NOI18N
        StaffFieldClear.setText("Clear");

        SatffDelete.setIcon(new javax.swing.ImageIcon(getClass().getResource("/delete.png"))); // NOI18N
        SatffDelete.setText("Delete");
        SatffDelete.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                SatffDeleteActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel5Layout = new javax.swing.GroupLayout(jPanel5);
        jPanel5.setLayout(jPanel5Layout);
        jPanel5Layout.setHorizontalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel5Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel5Layout.createSequentialGroup()
                        .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(jPanel5Layout.createSequentialGroup()
                                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                    .addComponent(StaffFNameLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 89, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(StaffDoBLabel, javax.swing.GroupLayout.DEFAULT_SIZE, 102, Short.MAX_VALUE)
                                    .addComponent(StaffGenderLabel, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                    .addGroup(jPanel5Layout.createSequentialGroup()
                                        .addComponent(StaffFNTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 160, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addGap(18, 18, 18)
                                        .addComponent(StaffLNameLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 89, javax.swing.GroupLayout.PREFERRED_SIZE))
                                    .addComponent(StaffDoBTxtField)
                                    .addComponent(SGenderTxtField))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(StaffLNTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 175, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(jPanel5Layout.createSequentialGroup()
                                .addComponent(StaffUpdate, javax.swing.GroupLayout.PREFERRED_SIZE, 96, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(StaffInsert, javax.swing.GroupLayout.PREFERRED_SIZE, 96, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(StaffFieldClear, javax.swing.GroupLayout.PREFERRED_SIZE, 90, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(SatffDelete, javax.swing.GroupLayout.PREFERRED_SIZE, 90, javax.swing.GroupLayout.PREFERRED_SIZE)))
                        .addGap(0, 0, Short.MAX_VALUE))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel5Layout.createSequentialGroup()
                        .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                            .addComponent(jPanel13, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(jPanel12, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                        .addContainerGap())))
        );
        jPanel5Layout.setVerticalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel5Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(StaffFNameLabel)
                    .addComponent(StaffLNameLabel)
                    .addComponent(StaffFNTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(StaffLNTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(StaffDoBLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 18, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(StaffDoBTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(StaffGenderLabel)
                    .addComponent(SGenderTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jPanel12, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jPanel13, javax.swing.GroupLayout.PREFERRED_SIZE, 128, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(StaffUpdate)
                    .addComponent(StaffInsert)
                    .addComponent(StaffFieldClear)
                    .addComponent(SatffDelete))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        jPanel11.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "Search", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Dialog", 3, 15), new java.awt.Color(204, 7, 12))); // NOI18N

        StaffIDSearchLabel.setText("Staff ID:");

        javax.swing.GroupLayout jPanel11Layout = new javax.swing.GroupLayout(jPanel11);
        jPanel11.setLayout(jPanel11Layout);
        jPanel11Layout.setHorizontalGroup(
            jPanel11Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel11Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(StaffIDSearchLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 63, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(StaffIDSearchTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, 438, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel11Layout.setVerticalGroup(
            jPanel11Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel11Layout.createSequentialGroup()
                .addGroup(jPanel11Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(StaffIDSearchLabel)
                    .addComponent(StaffIDSearchTxtField, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(0, 11, Short.MAX_VALUE))
        );

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jPanel5, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jPanel11, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jPanel10, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap())
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addComponent(jPanel11, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jPanel5, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addComponent(jPanel10, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap())
        );

        jTabbedPane1.addTab("Staff Info ", jPanel1);

        jPanel16.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "Room/Equipment Info", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Dialog", 0, 15))); // NOI18N

        REtable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        jScrollPane5.setViewportView(REtable);

        javax.swing.GroupLayout jPanel16Layout = new javax.swing.GroupLayout(jPanel16);
        jPanel16.setLayout(jPanel16Layout);
        jPanel16Layout.setHorizontalGroup(
            jPanel16Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel16Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane5, javax.swing.GroupLayout.DEFAULT_SIZE, 391, Short.MAX_VALUE)
                .addContainerGap())
        );
        jPanel16Layout.setVerticalGroup(
            jPanel16Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel16Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane5)
                .addContainerGap())
        );

        jPanel17.setBorder(javax.swing.BorderFactory.createTitledBorder("Staff/Equipment Info"));

        SEtable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        jScrollPane6.setViewportView(SEtable);

        javax.swing.GroupLayout jPanel17Layout = new javax.swing.GroupLayout(jPanel17);
        jPanel17.setLayout(jPanel17Layout);
        jPanel17Layout.setHorizontalGroup(
            jPanel17Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel17Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane6, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel17Layout.setVerticalGroup(
            jPanel17Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel17Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane6, javax.swing.GroupLayout.DEFAULT_SIZE, 488, Short.MAX_VALUE)
                .addContainerGap())
        );

        javax.swing.GroupLayout jPanel4Layout = new javax.swing.GroupLayout(jPanel4);
        jPanel4.setLayout(jPanel4Layout);
        jPanel4Layout.setHorizontalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jPanel16, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 70, Short.MAX_VALUE)
                .addComponent(jPanel17, javax.swing.GroupLayout.PREFERRED_SIZE, 476, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap())
        );
        jPanel4Layout.setVerticalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jPanel16, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap())
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addGap(22, 22, 22)
                .addComponent(jPanel17, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(27, Short.MAX_VALUE))
        );

        jTabbedPane1.addTab("Equipment Info", jPanel4);

        jPanel14.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "Classes Information", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Dialog", 3, 15))); // NOI18N

        Classtable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        jScrollPane3.setViewportView(Classtable);

        javax.swing.GroupLayout jPanel14Layout = new javax.swing.GroupLayout(jPanel14);
        jPanel14.setLayout(jPanel14Layout);
        jPanel14Layout.setHorizontalGroup(
            jPanel14Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel14Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane3, javax.swing.GroupLayout.DEFAULT_SIZE, 431, Short.MAX_VALUE)
                .addContainerGap())
        );
        jPanel14Layout.setVerticalGroup(
            jPanel14Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel14Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane3, javax.swing.GroupLayout.DEFAULT_SIZE, 510, Short.MAX_VALUE)
                .addContainerGap())
        );

        jPanel15.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "Room Information", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Dialog", 3, 15))); // NOI18N

        Roomtable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        jScrollPane4.setViewportView(Roomtable);

        javax.swing.GroupLayout jPanel15Layout = new javax.swing.GroupLayout(jPanel15);
        jPanel15.setLayout(jPanel15Layout);
        jPanel15Layout.setHorizontalGroup(
            jPanel15Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel15Layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(jScrollPane4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap())
        );
        jPanel15Layout.setVerticalGroup(
            jPanel15Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel15Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane4)
                .addContainerGap())
        );

        javax.swing.GroupLayout jPanel3Layout = new javax.swing.GroupLayout(jPanel3);
        jPanel3.setLayout(jPanel3Layout);
        jPanel3Layout.setHorizontalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jPanel14, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addGap(18, 18, 18)
                .addComponent(jPanel15, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap())
        );
        jPanel3Layout.setVerticalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel3Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jPanel14, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jPanel15, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap())
        );

        jTabbedPane1.addTab("Class/Room Info", jPanel3);

        Logout.setIcon(new javax.swing.ImageIcon("/home/zorin99/NetBeansProjects/logout.png")); // NOI18N
        Logout.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                LogoutActionPerformed(evt);
            }
        });

        jMenuBar1.setBackground(new java.awt.Color(218, 90, 90));
        jMenuBar1.setForeground(new java.awt.Color(254, 254, 254));
        jMenuBar1.setFont(new java.awt.Font("Roboto", 1, 16)); // NOI18N

        TimeLabel.setText("Time");
        jMenuBar1.add(TimeLabel);

        DateLabel.setText("Date");
        jMenuBar1.add(DateLabel);

        WelcomeLabel.setText("       Welcome..");
        jMenuBar1.add(WelcomeLabel);

        AdminName.setText("                      ");
        jMenuBar1.add(AdminName);

        setJMenuBar(jMenuBar1);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(Logout, javax.swing.GroupLayout.PREFERRED_SIZE, 55, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap())
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jTabbedPane1))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(Logout, javax.swing.GroupLayout.PREFERRED_SIZE, 24, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(jTabbedPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 639, javax.swing.GroupLayout.PREFERRED_SIZE))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void LogoutActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_LogoutActionPerformed
        // TODO add your handling code here:
        LoginForm logform = new LoginForm(this);
        logform.setVisible(true);
        this.setVisible(false);
        this.dispose();//destroy this window 
    }//GEN-LAST:event_LogoutActionPerformed
//search for Trainee
    private void JTraineeSearchAreaKeyReleased(java.awt.event.KeyEvent evt) {//GEN-FIRST:event_JTraineeSearchAreaKeyReleased
        // TODO add your handling code here:
        try{
        String traineeID = JTraineeSearchArea.getText();
        String searchQuery = "select* from Product where ID = "+traineeID;
        rs = dbm.select(searchQuery);
        boolean found = rs.next();
        
        if(found){
              //fill the product information fields 
            String tid = rs.getString("tID");
            TraineeIDTxtField.setText(tid);
            
            
            String fname = rs.getString("fName");
            FNameTxtField.setText(fname);
            
            String lname = rs.getString("lName");
            LNameTxtField.setText(lname);
            
             String address = rs.getString("taddress");
            AddressTxtField.setText(address);
            
             String Dob = rs.getString("bd");
            DoBTxtField.setText(Dob);
            
             String phone = rs.getString("tNo");
            PhoneTxtField.setText(phone);
        
             String email = rs.getString("Tmail");
            EmailTxtField.setText(email);
            
             String join = rs.getString("joinD");
            TraineeJoinDTxtField.setText(join);
            
            
             String end = rs.getString("expireD");
            EDataTxtField.setText(end);
            
             String membership = rs.getString("mType");
            MemberTxtField.setText(membership);
            
            String costQ = "select cost from Membership where mType='"+membership+"'";
            rs = dbm.select(costQ);
            String cost = rs.getString("cost");
            MemberCostTxtField.setText(cost);
            
        
        
        
        }else{ JOptionPane.showMessageDialog(rootPane,"Sorry, this ID cannot be found!");}
        
        }catch(Exception ex){}
        finally{
           try{
              dbm.releaseResources(); 
           }
           catch(Exception ex){}
       }
    }//GEN-LAST:event_JTraineeSearchAreaKeyReleased
//clear fileds
    private void TraineeFieldsClearActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_TraineeFieldsClearActionPerformed
        // TODO add your handling code here:
       
            FNameTxtField.setText("");
            LNameTxtField.setText("");
            AddressTxtField.setText("");
            TraineeIDTxtField.setText("");
            DoBTxtField.setText("");
            PhoneTxtField.setText("");             
            EmailTxtField.setText("");                         
            TraineeJoinDTxtField.setText("");                       
            EDataTxtField.setText("");          
            MemberTxtField.setText("");         
            MemberCostTxtField.setText("");
        
    }//GEN-LAST:event_TraineeFieldsClearActionPerformed
//delete trainee
    private void TraineeDeleteActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_TraineeDeleteActionPerformed
        // TODO add your handling code here:
         int warningMsg = JOptionPane.showConfirmDialog(null, "Are you sure you want to delete trainee?","Delete",JOptionPane.YES_NO_OPTION);
        if(warningMsg == 0){
            String tID = TraineeIDTxtField.getText();
            String deleteQuery = "delete from trainees where tID="+tID;
            String selectQuery = "select ID from trainees where tID="+tID;
            try{
                rs = dbm.select(selectQuery);
                boolean found = rs.next();
                if(found){
                    dbm.delete(deleteQuery);
                    JOptionPane.showMessageDialog(null,"Trainee Deleted");
                    dbm.releaseResources();
                }else
                    JOptionPane.showMessageDialog(null,"ID cannot be found!");
            
            }catch(Exception ex){ ex.getMessage();}
            updateTrainee();
        }
    }//GEN-LAST:event_TraineeDeleteActionPerformed
//add new trainee
    private void TraineeInsertActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_TraineeInsertActionPerformed
        // TODO add your handling code here:
        int warningMsg = JOptionPane.showConfirmDialog(null, "Are you sure you want to add new registration?","New Registration",JOptionPane.YES_NO_OPTION);
        if(warningMsg == 0){
            try{         
               String tID = TraineeIDTxtField.getText();
               String fname = FNameTxtField.getText();
               String lname = LNameTxtField.getText();
               
               String add = AddressTxtField.getText();
               String dob = DoBTxtField.getText();
            
                String phone = PhoneTxtField.getText();
        
             
                String email = EmailTxtField.getText();
            
             
                String joinD= TraineeJoinDTxtField.getText();
            
            
                String eDate= EDataTxtField.getText();
            
           
                String member = MemberTxtField.getText();
            
           
                
                
                
                String insertQuery = "insert into trainees (tID ,fName ,lName ,taddress,bd,tNo,Tmail,joinD,expireD,mType)"
                        + " values("+tID+",'"+fname+"','"+lname+"','"+add+"',"+dob+","+phone+",'"+email+"',"+joinD+","+eDate+",'"+member+"');";
               
                dbm.insert(insertQuery);
                
                JOptionPane.showMessageDialog(null,"Data is added successfully");
                dbm.releaseResources();
            }catch(Exception ex){
                JOptionPane.showMessageDialog(rootPane, ex.getMessage());   
            }
           updateTrainee();
        }
    }//GEN-LAST:event_TraineeInsertActionPerformed
//update trainee info
    private void TraineeUpdateActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_TraineeUpdateActionPerformed
        // TODO add your handling code here:
         int warningMsg = JOptionPane.showConfirmDialog(null, "Are you sure you want to add item?","Add Item",JOptionPane.YES_NO_OPTION);
        if(warningMsg == 0){
            try{         
               String tID = TraineeIDTxtField.getText();
               String fname = FNameTxtField.getText();
               String lname = LNameTxtField.getText();
               String add = AddressTxtField.getText();
               String dob = DoBTxtField.getText();
               String phone = PhoneTxtField.getText();
               String email = EmailTxtField.getText();
               String joinD= TraineeJoinDTxtField.getText();
               String eDate= EDataTxtField.getText();
               String member = MemberTxtField.getText();
               String updateQuery = "Update trainees set tID="+tID+", fName='"+fname+"', lName='"+lname+"', taddress='"+add+"', bd ="+dob+",tNo="+phone+", Tmail='"+email+"',joinD="+joinD+", expireD="+eDate+",mType='"+member+"';";
              dbm.update(updateQuery);
              JOptionPane.showMessageDialog(null,"Data is added successfully");
               dbm.releaseResources();
               
            }catch(Exception ex){
                JOptionPane.showMessageDialog(rootPane, ex.getMessage());   
            }
           
        }
        updateTrainee();
    }//GEN-LAST:event_TraineeUpdateActionPerformed
//delete Staff
    private void SatffDeleteActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_SatffDeleteActionPerformed
        // TODO add your handling code here:
         int warningMsg = JOptionPane.showConfirmDialog(null, "Are you sure you want to delete staff?","Delete",JOptionPane.YES_NO_OPTION);
        if(warningMsg == 0){
            String staffid = StaffIDTxtField.getText();
            String deleteQuery = "delete from Product where ID="+staffid;
            String selectQuery = "select ID from Product where ID="+staffid;
            try{
                rs = dbm.select(selectQuery);
                boolean found = rs.next();
                if(found){
                    dbm.delete(deleteQuery);
                    JOptionPane.showMessageDialog(null,"Staff Deleted");
                    dbm.releaseResources();
                }else
                    JOptionPane.showMessageDialog(null,"IDcannot be found!");
            
            }catch(Exception ex){ ex.getMessage();}
            updateStaff();
        }
        
    }//GEN-LAST:event_SatffDeleteActionPerformed
//new staff
    private void StaffInsertActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_StaffInsertActionPerformed
        // TODO add your handling code here:
        int warningMsg = JOptionPane.showConfirmDialog(null, "Are you sure you want to add new registration?","New Registration",JOptionPane.YES_NO_OPTION);
        if(warningMsg == 0){
            try{         
               String sID = StaffIDTxtField.getText();
               String sfname = StaffFNTxtField.getText();
               String slname = StaffLNTxtField.getText();
               
               String sadd = StaffAddressTxtField.getText();
               String sdob = StaffDoBTxtField.getText();
            
               String phone = StaffPhoneTxtField.getText();
        
             
                String email = StaffEmailTxtField.getText();
            
                String dofwork = DofworkTxtField.getText();
                String joinD= StaffStartTxtField.getText();
            
                String salary = SalaryTxtField.getText();
                String eDate= StaffEndTxtField.getText();
            
                String gender = SGenderTxtField.getText();
                String division = SatffDivTxtField.getText();
           
                String insertQuery = "insert into trainees (staffID ,fName ,lName,gender,salary,phone,email,addr,mission,dayofwork,sDate,eDate,birthD)"
                        + " values("+sID+",'"+sfname+"','"+slname+"','"+gender+"',"+salary+","+phone+",'"+email+"','"+sadd+"','"+division+"','"+dofwork+"',"+joinD+","+eDate+","+sdob+");";
               
                dbm.insert(insertQuery);
                
                JOptionPane.showMessageDialog(null,"Data is added successfully");
                dbm.releaseResources();
            }catch(Exception ex){
                JOptionPane.showMessageDialog(rootPane, ex.getMessage());   
            }
           updateTrainee();
        }
        
    }//GEN-LAST:event_StaffInsertActionPerformed
//update info (not completed)
    private void StaffUpdateActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_StaffUpdateActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_StaffUpdateActionPerformed

    
    
    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(MainForm.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(MainForm.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(MainForm.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(MainForm.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new MainForm().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JLabel AddressLabel;
    private javax.swing.JTextField AddressTxtField;
    private javax.swing.JMenu AdminName;
    private javax.swing.JTable Classtable;
    private javax.swing.JMenu DateLabel;
    private javax.swing.JLabel DoBLabel;
    private javax.swing.JTextField DoBTxtField;
    private javax.swing.JTextField DofworkTxtField;
    private javax.swing.JTextField EDataTxtField;
    private javax.swing.JLabel EmailLabel;
    private javax.swing.JTextField EmailTxtField;
    private javax.swing.JLabel FNameLabel;
    private javax.swing.JTextField FNameTxtField;
    private javax.swing.JTextField JTraineeSearchArea;
    private javax.swing.JLabel LNameLabel;
    private javax.swing.JTextField LNameTxtField;
    private javax.swing.JButton Logout;
    private javax.swing.JLabel MemberCostLabel;
    private javax.swing.JTextField MemberCostTxtField;
    private javax.swing.JTextField MemberTxtField;
    private javax.swing.JLabel MembershipLabel;
    private javax.swing.JLabel PhoneLabel;
    private javax.swing.JTextField PhoneTxtField;
    private javax.swing.JTable REtable;
    private javax.swing.JTable Roomtable;
    private javax.swing.JTable SEtable;
    private javax.swing.JTextField SGenderTxtField;
    private javax.swing.JLabel SalaryLabel;
    private javax.swing.JTextField SalaryTxtField;
    private javax.swing.JButton SatffDelete;
    private javax.swing.JTextField SatffDivTxtField;
    private javax.swing.JLabel StaffAddressLabel;
    private javax.swing.JTextField StaffAddressTxtField;
    private javax.swing.JLabel StaffDivisionLabel;
    private javax.swing.JLabel StaffDoBLabel;
    private javax.swing.JTextField StaffDoBTxtField;
    private javax.swing.JLabel StaffEmailLabel;
    private javax.swing.JTextField StaffEmailTxtField;
    private javax.swing.JLabel StaffEndLabel;
    private javax.swing.JTextField StaffEndTxtField;
    private javax.swing.JTextField StaffFNTxtField;
    private javax.swing.JLabel StaffFNameLabel;
    private javax.swing.JButton StaffFieldClear;
    private javax.swing.JLabel StaffGenderLabel;
    private javax.swing.JLabel StaffIDSearchLabel;
    private javax.swing.JTextField StaffIDSearchTxtField;
    private javax.swing.JTextField StaffIDTxtField;
    private javax.swing.JButton StaffInsert;
    private javax.swing.JTextField StaffLNTxtField;
    private javax.swing.JLabel StaffLNameLabel;
    private javax.swing.JLabel StaffPhoneLabel;
    private javax.swing.JTextField StaffPhoneTxtField;
    private javax.swing.JLabel StaffStartLable;
    private javax.swing.JTextField StaffStartTxtField;
    private javax.swing.JTable StaffTable;
    private javax.swing.JButton StaffUpdate;
    private javax.swing.JMenu TimeLabel;
    private javax.swing.JButton TraineeDelete;
    private javax.swing.JButton TraineeFieldsClear;
    private javax.swing.JLabel TraineeID;
    private javax.swing.JLabel TraineeIDLabel;
    private javax.swing.JTextField TraineeIDTxtField;
    private javax.swing.JButton TraineeInsert;
    private javax.swing.JLabel TraineeJoinDLabel;
    private javax.swing.JTextField TraineeJoinDTxtField;
    private javax.swing.JTable TraineeTable;
    private javax.swing.JButton TraineeUpdate;
    private javax.swing.JMenu WelcomeLabel;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JMenuBar jMenuBar1;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel10;
    private javax.swing.JPanel jPanel11;
    private javax.swing.JPanel jPanel12;
    private javax.swing.JPanel jPanel13;
    private javax.swing.JPanel jPanel14;
    private javax.swing.JPanel jPanel15;
    private javax.swing.JPanel jPanel16;
    private javax.swing.JPanel jPanel17;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPanel jPanel3;
    private javax.swing.JPanel jPanel4;
    private javax.swing.JPanel jPanel5;
    private javax.swing.JPanel jPanel6;
    private javax.swing.JPanel jPanel7;
    private javax.swing.JPanel jPanel8;
    private javax.swing.JPanel jPanel9;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JScrollPane jScrollPane3;
    private javax.swing.JScrollPane jScrollPane4;
    private javax.swing.JScrollPane jScrollPane5;
    private javax.swing.JScrollPane jScrollPane6;
    private javax.swing.JTabbedPane jTabbedPane1;
    // End of variables declaration//GEN-END:variables
}
