package io.causallabs.example;

public class SimplePlugin implements SimplePluginBase {

    @Override
    public void eval(Session session, Simple simple) throws Exception {
        System.out.println("Simple impression with input: " + simple.getSimpleInput());
    }
}
