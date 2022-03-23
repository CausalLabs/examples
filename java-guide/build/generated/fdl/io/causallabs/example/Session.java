package io.causallabs.example;

/** Plugin interface for the feature
 *  
 *  
 */

public interface Session 
{

    /** 
     *  
     */
    
    public String getVisitorId();
    /** 
     *  
     */
    
    public String getSessionId();
    /** 
     *  
     */
    
    public long getStartTime();
    /** 
     *  
     */
    
    public long getLastModifiedTime();
    /** 
     *  
     */
    
    public String getIpAddress();
    /** 
     *  
     */
    
    public String getUserAgent();
    /** 
     *  
     */
    
    public String getClientType();
    /** 
     *  
     */
    
    public String getEntryUrl();
    /** 
     *  
     */
    
    public java.util.List<String> getVariants();
    /** 
     *  
     */
    
    public String getArrivalId();

    /** 
     *  
     */
    
    public String getUserZipCode();
    /** 
     *  
     */
    
    public void setUserZipCode( String x );
}
