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
public final class SimpleImpl implements Simple, Requested
{
    /** Constructor to write unit tests
     * @param testInput 
     */
    public SimpleImpl(
        long _testInput
    ) throws ApiException {
        setTestInput(_testInput);
    }

    // Constructor used when deserializing stuff over the wire
    public SimpleImpl() 
    {
    }

    // reset values to default
    public void reset()
    {
       if (_val_impressionIds != null) _val_impressionIds.clear();

       _isset_impressionIds = false;
       _isset_firstTime = false;
       _isset_impressionCount = false;
       _isset_testInput = false;

       this._val_testOutput = _control_testOutput;
       _isset_testOutput = false;
    }

    public void setActive(boolean x) { _active = true; }
    public boolean isActive() { return _active; }
    boolean _active = false;

    public final java.util.List<String> getImpressionIds() { return _val_impressionIds; };
    public final void setImpressionIds(java.util.List<String> _x) { _val_impressionIds = _x; _isset_impressionIds = true; };
    private java.util.List<String> _val_impressionIds;
    private boolean _isset_impressionIds = false;

    public final long getFirstTime() { return _val_firstTime; };
    public final void setFirstTime(long _x) { _val_firstTime = _x; _isset_firstTime = true; };
    private long _val_firstTime;
    private boolean _isset_firstTime = false;

    public final long getImpressionCount() { return _val_impressionCount; };
    public final void setImpressionCount(long _x) { _val_impressionCount = _x; _isset_impressionCount = true; };
    private long _val_impressionCount;
    private boolean _isset_impressionCount = false;

    public final long getTestInput() { return _val_testInput; };
    public final void setTestInput(long _x) { _val_testInput = _x; _isset_testInput = true; };
    private long _val_testInput;
    private boolean _isset_testInput = false;



    public final long getTestOutput() { return _val_testOutput; };
    public final void setTestOutput(long _x) { _val_testOutput = _x; _isset_testOutput = true; };
    public final boolean isTestOutputSet() { return _isset_testOutput; }
    private boolean _isset_testOutput = false;
    private static final long _control_testOutput = 42;
    private long _val_testOutput = _control_testOutput;


    public boolean argsMatch( Requested obj ) {
        if (!(obj instanceof SimpleImpl))
            return false;
        SimpleImpl _x = (SimpleImpl)obj;
        if (getTestInput() != _x.getTestInput()) return false;
        return true;
    }

    public boolean keysMatch( Requested obj ) {
        if (!(obj instanceof SimpleImpl))
            return false;
        SimpleImpl _x = (SimpleImpl)obj;
        return true;
    }

    public synchronized void incCount(String impressionId) {
        _val_impressionCount++;
        if (impressionId == null)
            return;
        if (getImpressionIds() == null) {
            java.util.ArrayList<String> ids = new java.util.ArrayList<>(1);
            ids.add(impressionId);
            setImpressionIds(ids);
        } else if (!getImpressionIds().contains(impressionId)) {
            getImpressionIds().add(impressionId);
            _isset_impressionIds = true;
        }
    }

    public long count() {
        return _val_impressionCount;
    }


    public String featureName() { return "Simple"; }

    public String getImpressionId() { 
        java.util.List<String> ids = getImpressionIds();
        if (ids == null)
          return null;
        if (ids.isEmpty())
          return null;
        return ids.get(ids.size()-1); 
    };


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
                    case "impressionIds":
                        java.util.List<String> _impressionIds;
                        if (!_parser.isExpectedStartArrayToken()) {
    throw new ApiException("Expecting a list for " + _parser.getCurrentName());
}
_parser.nextToken();
_impressionIds = new java.util.ArrayList<String>();
while (true) {
    if (_parser.getCurrentToken() == JsonToken.END_ARRAY) {
        _parser.nextToken();
        break;
    }
    String _element1;
    if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_element1 = _parser.getValueAsString(); _parser.nextToken();
    _impressionIds.add(_element1);
}

                        setImpressionIds( _impressionIds );
                        break;
                    case "firstTime":
                        long _firstTime;
                        if (_parser.getCurrentToken() != JsonToken.VALUE_NUMBER_INT )
 throw new ApiException("Expecting an integer for " + _parser.getCurrentName());
_firstTime = _parser.getValueAsLong(); _parser.nextToken();
                        setFirstTime( _firstTime );
                        break;
                    case "impressionCount":
                        long _impressionCount;
                        if (_parser.getCurrentToken() != JsonToken.VALUE_NUMBER_INT )
 throw new ApiException("Expecting an integer for " + _parser.getCurrentName());
_impressionCount = _parser.getValueAsLong(); _parser.nextToken();
                        setImpressionCount( _impressionCount );
                        break;
                    case "testInput":
                        long _testInput;
                        if (_parser.getCurrentToken() != JsonToken.VALUE_NUMBER_INT )
 throw new ApiException("Expecting an integer for " + _parser.getCurrentName());
_testInput = _parser.getValueAsLong(); _parser.nextToken();
                        setTestInput( _testInput );
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
            if (_isset_testInput) {
            _gen.writeFieldName("testInput");
            long _testInput = getTestInput();
            _gen.writeNumber(_testInput);
            }
            if (_isset_impressionIds) {
            _gen.writeFieldName("impressionIds");
            java.util.List<String> _impressionIds = getImpressionIds();
            _gen.writeStartArray();
   for (String element : _impressionIds) {
_gen.writeString(element);
}
 _gen.writeEndArray();

            }

            _gen.writeFieldName("testOutput");
            long _testOutput = getTestOutput();
            _gen.writeNumber(_testOutput);
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
            return getImpressionIds();
        case 1:
            return getFirstTime();
        case 2:
            return getImpressionCount();
        case 3:
            return getTestInput();
        case 4:
            return getTestOutput();
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
            setImpressionIds((java.util.List<String>)o);
            break;
        case 1:
            setFirstTime((long)o);
            break;
        case 2:
            setImpressionCount((long)o);
            break;
        case 3:
            setTestInput((long)o);
            break;
        case 4:
            setTestOutput((long)o);
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
            return _isset_impressionIds;
        case 1:
            return _isset_firstTime;
        case 2:
            return _isset_impressionCount;
        case 3:
            return _isset_testInput;
        case 4:
            return _isset_testOutput;
        default:
            throw new RuntimeException("Invalid avro index");
        }
    }
}
