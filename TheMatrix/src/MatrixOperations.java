/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author zorin99
 */
import java.lang.*;
import java.math.*;

public  class MatrixOperations {
    //constructor
   
    public static double[][] createMatrix(String strMatrix){
        //casting 
        String[] mat = strMatrix.split("\\|");
        double[][] matrix = new double[mat.length][mat[0].split(",").length]; 
        for(int row = 0; row < matrix.length; row++){
          for(int col = 0; col < matrix[row].length; col++){
             matrix[row][col] = Integer.parseInt(mat[row].split(",")[col]);
          }
        }
        return matrix;
    
    }
    public static String checkMatType(double[][] matrix){
        int zeebool =0 ,sqbool =0 ,  idenbool =0 ,dibool =0 ,ident =0 ,zero =0 ,diagonal=0;
    
        int rows = matrix.length;
        int cols = matrix[0].length;
    
     
        //diagnol matrix
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                 {
                       if(j!=i)
                        {
                        if(matrix[i][j] == 0 )
                             dibool=1;
                         else
                            {
                            dibool = 0;
                            break;
                            }
                        }  
                       else
                         {
                          if(matrix[i][j] != 0 )
                               dibool=1;
                          else{
                               diagonal = 1;
                            break;}
                         }
                       if(diagonal==1 ||dibool == 0)
                       {dibool=0;
                       break;
                       }
                 }
       
        
        //square matrix
        if( rows == cols)
        {
            sqbool =2;
        }
       //zero matrix
         for (int g = 0; g < rows; g++){
             for (int b = 0; b < cols; b++)
             {
                 if(matrix[g][b] ==0 )
                 {
                       zeebool = 3;
                      
                 }
                 else if (matrix[g][b] !=0 )
                 {
                     zero = 3;
                     break;
                 }
             }
             if(zero ==3)
             { zeebool =0;
             break;
             }
         }
                
         
         
        //identity matrix
        if(rows == cols)
           {
            for (int i = 0; i < 2; i++)
            {
                for (int j = 0; j < 2; j++){
                  if (i!=j) 
                  {
                    if(matrix[i][j] == 0 )
                              idenbool = 1;
                    else
                    {
                        idenbool = 0;
                        break;
                        
                    }
                  }
                else
                {
                //
                if (matrix[i][j]== 1 )
                
                    idenbool = 1;
                
                else{
                    ident = 2;
                   break;
                   }  
                }
            }
                if(ident == 2||idenbool == 0)
                {
                    idenbool = 0;
                break;
                }
           }
            }
        
            String returnvale ="";
            
            if(zeebool == 3 && sqbool == 2)
                 returnvale =("zero Matrix & square Matrix" );
              else if(dibool == 1 && sqbool == 2 && idenbool == 1 )
                     returnvale = ("dignol Matrix & square Matrix  & identity Matrix" );
                else if(sqbool == 2 &&  idenbool == 1 )
                        returnvale = ("square Matrix  & identity Matrix" );
                    else if(sqbool == 2 && dibool == 1)
                            returnvale = ("dignol Matrix & square Matrix" );
                        else if(zeebool == 3)
                               returnvale =("zero  Matrix");
                            else if(sqbool == 2)
                                 returnvale = ( " square Matrix");
                                else if (idenbool == 1 )
                                       returnvale =("  identity Matrix" );
                                    else if(dibool == 1)
                                         returnvale = ("dignol Matrix ");
            
         
         return returnvale;
            
    }
    public static double[][] mTranspose(double[][] matrix){
        int rows = matrix.length;
        int cols = matrix[0].length;
        double[][] resultmatrix = new double[rows][cols];
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                resultmatrix[j][i] = matrix[i][j];
        return resultmatrix;
    
    }
    public static double[][] mAddition(double[][] matrixA, double[][] matrixB){
        int rowsA = matrixA.length;
        int colsA = matrixA[0].length;
        int rowsB = matrixB.length;
        int colsB = matrixB[0].length;
        if(rowsA != rowsB || colsA != colsB)
            throw new RuntimeException("Illegal matrix dimensions.");
        double[][] resultmat = new double[rowsA][colsA];
        for (int i = 0; i < rowsA; i++)
            for (int j = 0; j < colsA; j++)
                resultmat[i][j] = matrixA[i][j] + matrixB[i][j];
        return resultmat;
    
    }
    public static double[][] mSubtraction(double[][] matrixA, double[][] matrixB){
        int rowsA = matrixA.length;
        int colsA = matrixA[0].length;
        int rowsB = matrixB.length;
        int colsB = matrixB[0].length;
        if(rowsA != rowsB || colsA != colsB)
            throw new RuntimeException("Illegal matrix dimensions.");
        double[][] resultmat = new double[rowsA][colsA];
        for (int i = 0; i < rowsA; i++)
            for (int j = 0; j < colsA; j++)
                resultmat[i][j] = matrixA[i][j] - matrixB[i][j];
        return resultmat;
    }
    public static double[][] mMultiplication(double[][] matrixA,double[][] matrixB){
        int rowsA = matrixA.length;
        int colsA = matrixA[0].length;
        int rowsB = matrixB.length;
        int colsB = matrixB[0].length;
        if (colsA != rowsB) 
            throw new RuntimeException("Illegal matrix dimensions.");
        double[][] resultmat = new double[rowsA][colsB];
        for (int i = 0; i < rowsA; i++)
            for (int j = 0; j < colsB; j++)
                for (int k = 0; k < colsA; k++)
                    resultmat[i][j] += matrixA[i][k] * matrixB[k][j];
        return resultmat;
    
    
    }
    public static double[][] mScalarMulti(double[][] matrix,int scalar){
        int rows = matrix.length;
        int cols = matrix[0].length;
        for(int i=0;i<rows;i++){
            for(int j=0;j<cols;j++)
                matrix[i][j] = (matrix[i][j])*scalar;
        }
        return matrix;
    }
}
