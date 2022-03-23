package io.causallabs.example;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;

import io.causallabs.runtime.Requested;
import io.causallabs.runtime.ApiException;
import io.causallabs.runtime.CausalClient;

/** 
 */
public final class SessionImpl implements Session, Requested
{
    /** Constructor to write unit tests
     * @param visitorId  - cannot be null.
     * @param arrivalId  - cannot be null.
     */
    public SessionImpl(
        String _visitorId,
        String _arrivalId
    ) throws ApiException {
        if (_visitorId == null)
           throw new ApiException("'visitorId' cannot be null");
        setVisitorId(_visitorId);
        if (_arrivalId == null)
           throw new ApiException("'arrivalId' cannot be null");
        setArrivalId(_arrivalId);
    }

    // Constructor used when deserializing stuff over the wire
    public SessionImpl() 
    {
    }

    // reset values to default
    public void reset()
    {

       _isset_visitorId = false;
       _isset_sessionId = false;
       _isset_startTime = false;
       _isset_lastModifiedTime = false;
       _isset_ipAddress = false;
       _isset_userAgent = false;
       _isset_clientType = false;
       _isset_entryUrl = false;
       _isset_variants = false;
       _isset_arrivalId = false;

       this._val_userZipCode = _control_userZipCode;
       _isset_userZipCode = false;
    }

    public void setActive(boolean x) { _active = true; }
    public boolean isActive() { return _active; }
    boolean _active = false;

    public final String getVisitorId() { return _val_visitorId; };
    public final void setVisitorId(String _x) { _val_visitorId = _x; _isset_visitorId = true; };
    private String _val_visitorId;
    private boolean _isset_visitorId = false;

    public final String getSessionId() { return _val_sessionId; };
    public final void setSessionId(String _x) { _val_sessionId = _x; _isset_sessionId = true; };
    private String _val_sessionId;
    private boolean _isset_sessionId = false;

    public final long getStartTime() { return _val_startTime; };
    public final void setStartTime(long _x) { _val_startTime = _x; _isset_startTime = true; };
    private long _val_startTime;
    private boolean _isset_startTime = false;

    public final long getLastModifiedTime() { return _val_lastModifiedTime; };
    public final void setLastModifiedTime(long _x) { _val_lastModifiedTime = _x; _isset_lastModifiedTime = true; };
    private long _val_lastModifiedTime;
    private boolean _isset_lastModifiedTime = false;

    public final String getIpAddress() { return _val_ipAddress; };
    public final void setIpAddress(String _x) { _val_ipAddress = _x; _isset_ipAddress = true; };
    private String _val_ipAddress;
    private boolean _isset_ipAddress = false;

    public final String getUserAgent() { return _val_userAgent; };
    public final void setUserAgent(String _x) { _val_userAgent = _x; _isset_userAgent = true; };
    private String _val_userAgent;
    private boolean _isset_userAgent = false;

    public final String getClientType() { return _val_clientType; };
    public final void setClientType(String _x) { _val_clientType = _x; _isset_clientType = true; };
    private String _val_clientType;
    private boolean _isset_clientType = false;

    public final String getEntryUrl() { return _val_entryUrl; };
    public final void setEntryUrl(String _x) { _val_entryUrl = _x; _isset_entryUrl = true; };
    private String _val_entryUrl;
    private boolean _isset_entryUrl = false;

    public final java.util.List<String> getVariants() { return _val_variants; };
    public final void setVariants(java.util.List<String> _x) { _val_variants = _x; _isset_variants = true; };
    private java.util.List<String> _val_variants;
    private boolean _isset_variants = false;

    public final String getArrivalId() { return _val_arrivalId; };
    public final void setArrivalId(String _x) { _val_arrivalId = _x; _isset_arrivalId = true; };
    private String _val_arrivalId;
    private boolean _isset_arrivalId = false;



    public final String getUserZipCode() { return _val_userZipCode; };
    public final void setUserZipCode(String _x) { _val_userZipCode = _x; _isset_userZipCode = true; };
    public final boolean isUserZipCodeSet() { return _isset_userZipCode; }
    private boolean _isset_userZipCode = false;
    private static final String _control_userZipCode = "";
    private String _val_userZipCode = _control_userZipCode;


    public boolean argsMatch( Requested obj ) {
        if (!(obj instanceof SessionImpl))
            return false;
        SessionImpl _x = (SessionImpl)obj;
        if (!java.util.Objects.equals(getVisitorId(), _x.getVisitorId())) return false;
        if (!java.util.Objects.equals(getArrivalId(), _x.getArrivalId())) return false;
        return true;
    }

    public boolean keysMatch( Requested obj ) {
        if (!(obj instanceof SessionImpl))
            return false;
        SessionImpl _x = (SessionImpl)obj;
        if (_isset_visitorId && _x._isset_visitorId) {
            if (!java.util.Objects.equals(getVisitorId(), _x.getVisitorId())) return false;
        }
        if (_isset_arrivalId && _x._isset_arrivalId) {
            if (!java.util.Objects.equals(getArrivalId(), _x.getArrivalId())) return false;
        }
        return true;
    }


    // session count is always 1
    public void incCount(String impressionId) {
    }

    public long count() {
        return 1;
    }

    public String featureName() { return "Session"; }



    // Data transport support
    public void deserializeArgs(JsonParser _parser) throws ApiException
    {            
        try {
            if (_parser.currentToken() != JsonToken.START_OBJECT)
                throw new ApiException("Malformed response: expecting json object");
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
                        String _visitorId;
                        if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_visitorId = _parser.getValueAsString(); _parser.nextToken();
                        setVisitorId( _visitorId );
                        break;
                    case "sessionId":
                        String _sessionId;
                        if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_sessionId = _parser.getValueAsString(); _parser.nextToken();
                        setSessionId( _sessionId );
                        break;
                    case "startTime":
                        long _startTime;
                        if (_parser.getCurrentToken() != JsonToken.VALUE_NUMBER_INT )
 throw new ApiException("Expecting an integer for " + _parser.getCurrentName());
_startTime = _parser.getValueAsLong(); _parser.nextToken();
                        setStartTime( _startTime );
                        break;
                    case "lastModifiedTime":
                        long _lastModifiedTime;
                        if (_parser.getCurrentToken() != JsonToken.VALUE_NUMBER_INT )
 throw new ApiException("Expecting an integer for " + _parser.getCurrentName());
_lastModifiedTime = _parser.getValueAsLong(); _parser.nextToken();
                        setLastModifiedTime( _lastModifiedTime );
                        break;
                    case "ipAddress":
                        String _ipAddress;
                        if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_ipAddress = _parser.getValueAsString(); _parser.nextToken();
                        setIpAddress( _ipAddress );
                        break;
                    case "userAgent":
                        String _userAgent;
                        if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_userAgent = _parser.getValueAsString(); _parser.nextToken();
                        setUserAgent( _userAgent );
                        break;
                    case "clientType":
                        String _clientType;
                        if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_clientType = _parser.getValueAsString(); _parser.nextToken();
                        setClientType( _clientType );
                        break;
                    case "entryUrl":
                        String _entryUrl;
                        if (_parser.getCurrentToken() == JsonToken.VALUE_NULL) {
_entryUrl = null;
_parser.nextToken();
} else {
if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_entryUrl = _parser.getValueAsString(); _parser.nextToken();}

                        setEntryUrl( _entryUrl );
                        break;
                    case "variants":
                        java.util.List<String> _variants;
                        if (!_parser.isExpectedStartArrayToken()) {
    throw new ApiException("Expecting a list for " + _parser.getCurrentName());
}
_parser.nextToken();
_variants = new java.util.ArrayList<String>();
while (true) {
    if (_parser.getCurrentToken() == JsonToken.END_ARRAY) {
        _parser.nextToken();
        break;
    }
    String _element3;
    if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_element3 = _parser.getValueAsString(); _parser.nextToken();
    _variants.add(_element3);
}

                        setVariants( _variants );
                        break;
                    case "arrivalId":
                        String _arrivalId;
                        if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_arrivalId = _parser.getValueAsString(); _parser.nextToken();
                        setArrivalId( _arrivalId );
                        break;
                    default:
                        // it's ok to have arguments we don't understand yet. Schema migration
                        CausalClient.consumeValue(_parser);
                }
            }
        } catch (IOException e) {
            Requested.logger.error("Attempt to deserialize from RAM failed");
            throw new RuntimeException("Attempt to deserialize from RAM failed, call causal support.");
        }
    }

    public void serializeResponse(JsonGenerator _gen) 
    {
        try {
            if (_isset_visitorId) {
            _gen.writeFieldName("visitorId");
            String _visitorId = getVisitorId();
            _gen.writeString(_visitorId);
            }
            if (_isset_arrivalId) {
            _gen.writeFieldName("arrivalId");
            String _arrivalId = getArrivalId();
            _gen.writeString(_arrivalId);
            }
            if (_isset_sessionId) {
            _gen.writeFieldName("sessionId");
            String _sessionId = getSessionId();
            _gen.writeString(_sessionId);
            }
            if (_isset_startTime) {
            _gen.writeFieldName("startTime");
            long _startTime = getStartTime();
            _gen.writeNumber(_startTime);
            }

            _gen.writeFieldName("userZipCode");
            String _userZipCode = getUserZipCode();
            _gen.writeString(_userZipCode);
        }
        catch (IOException e) {
                logger.error("Attempt to serialize to RAM failed");
                throw new RuntimeException(
                        "Attempt to serialize to RAM failed: " + e.getMessage(), e);
        }
    }

    // support for avro like access to user visible values
    final public Object get(int i) {
        switch (i) {
        case 0:
            return getVisitorId();
        case 1:
            return getSessionId();
        case 2:
            return getStartTime();
        case 3:
            return getLastModifiedTime();
        case 4:
            return getIpAddress();
        case 5:
            return getUserAgent();
        case 6:
            return getClientType();
        case 7:
            return getEntryUrl();
        case 8:
            return getVariants();
        case 9:
            return getArrivalId();
        case 10:
            return getUserZipCode();
        default:
            throw new RuntimeException("Invalid avro index");
        }
    }

    // support for avro like access to get values for serialization to the log files.
    final public Object getLog(int i) {
        switch (i) {
        default: 
           return get(i);
        }
    }

    // support for avro like access to get values for serialization to the log files.
    final public void putMutation(int i, Object o) {
        switch (i) {
        default: 
           put(i,o);
        }
    }

    @SuppressWarnings("unchecked")
    final public void put(int i, Object o) {
        switch (i) {
        case 0:
            setVisitorId((String)o);
            break;
        case 1:
            setSessionId((String)o);
            break;
        case 2:
            setStartTime((long)o);
            break;
        case 3:
            setLastModifiedTime((long)o);
            break;
        case 4:
            setIpAddress((String)o);
            break;
        case 5:
            setUserAgent((String)o);
            break;
        case 6:
            setClientType((String)o);
            break;
        case 7:
            setEntryUrl((String)o);
            break;
        case 8:
            setVariants((java.util.List<String>)o);
            break;
        case 9:
            setArrivalId((String)o);
            break;
        case 10:
            setUserZipCode((String)o);
            break;
        default:
            throw new RuntimeException("Invalid avro index");
        }
    }

    public void putExternal(int i, String name) {
        switch (i) {
        default:
            throw new RuntimeException("Invalid avro index");
        }
    }

    public boolean isSet(int i) {
        switch (i) {
        case 0:
            return _isset_visitorId;
        case 1:
            return _isset_sessionId;
        case 2:
            return _isset_startTime;
        case 3:
            return _isset_lastModifiedTime;
        case 4:
            return _isset_ipAddress;
        case 5:
            return _isset_userAgent;
        case 6:
            return _isset_clientType;
        case 7:
            return _isset_entryUrl;
        case 8:
            return _isset_variants;
        case 9:
            return _isset_arrivalId;
        case 10:
            return _isset_userZipCode;
        default:
            throw new RuntimeException("Invalid avro index");
        }
    }
}
