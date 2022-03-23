package io.causallabs.example;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;

import io.causallabs.runtime.SessionRequestable;
import io.causallabs.runtime.Requestable;
import io.causallabs.runtime.CausalClient;
import io.causallabs.runtime.ApiException;


/** 
 */
public final class SessionRequest extends SessionRequestable
{
    /**
     * @param visitorId  - cannot be null.
     * @param arrivalId  - cannot be null.
     */
    public SessionRequest(
        String _visitorId,
        String _arrivalId
    ) {
        if (_visitorId == null)
           throw new NullPointerException("'visitorId' cannot be null");
        _val_visitorId = _visitorId; 
        _isset_visitorId = true;
        if (_arrivalId == null)
           throw new NullPointerException("'arrivalId' cannot be null");
        _val_arrivalId = _arrivalId; 
        _isset_arrivalId = true;
    }

    static public SessionRequest fromVisitorId( String _visitorId ) {
        SessionRequest req = new SessionRequest();
        req._val_visitorId = _visitorId;
        req._isset_visitorId = true;
        return req;
    }
    static public SessionRequest fromArrivalId( String _arrivalId ) {
        SessionRequest req = new SessionRequest();
        req._val_arrivalId = _arrivalId;
        req._isset_arrivalId = true;
        return req;
    }
    private SessionRequest() {}

    public final String getVisitorId() { return _val_visitorId; };
    public final boolean isVisitorIdSet() { return _isset_visitorId; }
    private boolean _isset_visitorId = false;
    private String _val_visitorId;
    public final String getArrivalId() { return _val_arrivalId; };
    public final boolean isArrivalIdSet() { return _isset_arrivalId; }
    private boolean _isset_arrivalId = false;
    private String _val_arrivalId;
    public final String getSessionId() { return _val_sessionId; };
    public final boolean isSessionIdSet() { return _isset_sessionId; }
    private boolean _isset_sessionId = false;
    private String _val_sessionId;
    public final long getStartTime() { return _val_startTime; };
    public final boolean isStartTimeSet() { return _isset_startTime; }
    private boolean _isset_startTime = false;
    private long _val_startTime;

    public final String getUserZipCode() { return _val_userZipCode; };
    public final boolean isUserZipCodeSet() { return _isset_userZipCode; }
    private boolean _isset_userZipCode = false;
    private static final String _control_userZipCode = "";
    private String _val_userZipCode = _control_userZipCode;

    
    public String featureName() { return "Session"; }

    /**    
     *  */
   
   public void signalClick( long _clickValue ) 
   {
       signalClick( getSession()
          
          , _clickValue );
   }
    /**    
     *  */
   
   static public void signalClick( SessionRequestable session
       
       , long _clickValue )
   {
          try {
               JsonGenerator _gen = CausalClient.getInstance().createGenerator();
               _gen.writeStartObject();
               _gen.writeFieldName("id");
               session.serializeIds(_gen);
               _gen.writeStringField("event", "Click");
               _gen.writeFieldName("args");
               _gen.writeStartObject();
               _gen.writeFieldName("clickValue");
               _gen.writeNumber(_clickValue);
               _gen.writeEndObject();
               _gen.writeEndObject();
               CausalClient.getInstance().signal(_gen);
          } catch (IOException e) {
               CausalClient.logger.error("Couldn't signal Click");
          }
   }




    // Data transport support
    public void serializeArgs(JsonGenerator _gen)
    {
        try {
            _gen.writeStartObject();
            if (isVisitorIdSet()) {
                _gen.writeFieldName("visitorId");
                String _visitorId = getVisitorId();
                _gen.writeString(_visitorId);
            }
            if (isArrivalIdSet()) {
                _gen.writeFieldName("arrivalId");
                String _arrivalId = getArrivalId();
                _gen.writeString(_arrivalId);
            }
            _gen.writeEndObject();
        } catch (IOException e) {
            // this should never happen because, you know, RAM
            CausalClient.logger.error("Attempt to serialize to RAM failed");
            throw new RuntimeException("Attempt to serialize to RAM failed, call Causal support");
        }
    }

    // Data transport support
    public void serializeIds(JsonGenerator _gen)
    {
        try {
            _gen.writeStartObject();
            if (isVisitorIdSet()) {
                _gen.writeFieldName("visitorId");
                String _visitorId = getVisitorId();
                _gen.writeString(_visitorId);
            }
            if (isArrivalIdSet()) {
                _gen.writeFieldName("arrivalId");
                String _arrivalId = getArrivalId();
                _gen.writeString(_arrivalId);
            }
            _gen.writeEndObject();
        } catch (IOException e) {
            // this should never happen because, you know, RAM
            CausalClient.logger.error("Attempt to serialize to RAM failed");
            throw new RuntimeException("Attempt to serialize to RAM failed, call Causal support");
        }
    }

    public void deserializeResponse(JsonParser _parser) throws ApiException
    {            
        try {
            if (_parser.currentToken() != JsonToken.START_OBJECT)
                throw new ApiException("Malformed reponse: expecting json object");
            _parser.nextToken();
            while (true) {
                if (_parser.getCurrentToken() == JsonToken.END_OBJECT) {
                    _parser.nextToken();
                    break;
                }
                if (_parser.currentToken() != JsonToken.FIELD_NAME)
                    throw new ApiException("Malformed response: expecting field name");
                String _name = _parser.getCurrentName();
                _parser.nextToken();
                switch (_name) {
                    case "visitorId":
                        if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_val_visitorId = _parser.getValueAsString(); _parser.nextToken();
                        _isset_visitorId = true;
                        break;
                    case "arrivalId":
                        if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_val_arrivalId = _parser.getValueAsString(); _parser.nextToken();
                        _isset_arrivalId = true;
                        break;
                    case "sessionId":
                        if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_val_sessionId = _parser.getValueAsString(); _parser.nextToken();
                        _isset_sessionId = true;
                        break;
                    case "startTime":
                        if (_parser.getCurrentToken() != JsonToken.VALUE_NUMBER_INT )
 throw new ApiException("Expecting an integer for " + _parser.getCurrentName());
_val_startTime = _parser.getValueAsLong(); _parser.nextToken();
                        _isset_startTime = true;
                        break;
                    case "userZipCode":
                        if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_val_userZipCode = _parser.getValueAsString(); _parser.nextToken();
                        _isset_userZipCode = true;
                        break;
                    default:
                        // it's ok to have arguments we don't understand yet. Schema migration
                        CausalClient.consumeValue(_parser);
                }
            }
        } catch (IOException e) {
            CausalClient.logger.error("Attempt to deserialize from RAM failed");
            throw new RuntimeException("Attempt to deserialize from RAM failed, call Causal support.");
        }
    }

    public SessionRequestable getSession() {
        return this;
    }

    public static final Logger logger = LoggerFactory.getLogger(SessionRequest.class);
}
