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
public final class SimpleRequest extends Requestable
{
    /**
     * @param testInput 
     */
    public SimpleRequest(
        long _testInput
    ) {
        _val_testInput = _testInput; 
        _isset_testInput = true;
    }


    public final long getTestInput() { return _val_testInput; };
    public final boolean isTestInputSet() { return _isset_testInput; }
    private boolean _isset_testInput = false;
    private long _val_testInput;
    public final java.util.List<String> getImpressionIds() { return _val_impressionIds; };
    public final boolean isImpressionIdsSet() { return _isset_impressionIds; }
    private boolean _isset_impressionIds = false;
    private java.util.List<String> _val_impressionIds;

    public final long getTestOutput() { return _val_testOutput; };
    public final boolean isTestOutputSet() { return _isset_testOutput; }
    private boolean _isset_testOutput = false;
    private static final long _control_testOutput = 42;
    private long _val_testOutput = _control_testOutput;

    // on an error, set all outputs to the control values
    public void setError(Throwable t) {
        super.setError(t);
        _val_testOutput = _control_testOutput;
        _isset_testOutput = true;
    };
    
    public String featureName() { return "Simple"; }

    /**    
     *  */
   
   public void signalClick( long _clickValue ) 
   {
       signalClick( getSession()
          , getImpressionId()
          , _clickValue );
   }
    /**    
     *  */
   
   static public void signalClick( SessionRequestable session
       , String impressionId 
       , long _clickValue )
   {
          try {
               JsonGenerator _gen = CausalClient.getInstance().createGenerator();
               _gen.writeStartObject();
               _gen.writeFieldName("id");
               session.serializeIds(_gen);
               _gen.writeStringField("event", "Click");
               _gen.writeStringField("feature", "Simple");
               _gen.writeStringField("impressionId", impressionId);
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
            if (isTestInputSet()) {
                _gen.writeFieldName("testInput");
                long _testInput = getTestInput();
                _gen.writeNumber(_testInput);
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
                    case "testInput":
                        if (_parser.getCurrentToken() != JsonToken.VALUE_NUMBER_INT )
 throw new ApiException("Expecting an integer for " + _parser.getCurrentName());
_val_testInput = _parser.getValueAsLong(); _parser.nextToken();
                        _isset_testInput = true;
                        break;
                    case "impressionIds":
                        if (!_parser.isExpectedStartArrayToken()) {
    throw new ApiException("Expecting a list for " + _parser.getCurrentName());
}
_parser.nextToken();
_val_impressionIds = new java.util.ArrayList<String>();
while (true) {
    if (_parser.getCurrentToken() == JsonToken.END_ARRAY) {
        _parser.nextToken();
        break;
    }
    String _element2;
    if (_parser.getCurrentToken() != JsonToken.VALUE_STRING )
 throw new ApiException("Expecting a string for " + _parser.getCurrentName());
_element2 = _parser.getValueAsString(); _parser.nextToken();
    _val_impressionIds.add(_element2);
}

                        _isset_impressionIds = true;
                        break;
                    case "testOutput":
                        if (_parser.getCurrentToken() != JsonToken.VALUE_NUMBER_INT )
 throw new ApiException("Expecting an integer for " + _parser.getCurrentName());
_val_testOutput = _parser.getValueAsLong(); _parser.nextToken();
                        _isset_testOutput = true;
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

    public String getImpressionId() { 
        List<String> ids = getImpressionIds();
        if (ids == null)
          return null;
        if (ids.isEmpty())
          return null;
        return ids.get(ids.size()-1); 
    };


    public static final Logger logger = LoggerFactory.getLogger(SimpleRequest.class);
}
