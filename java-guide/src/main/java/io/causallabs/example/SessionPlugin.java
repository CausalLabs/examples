package io.causallabs.example;

import java.util.List;
import java.util.UUID;
import io.causallabs.runtime.VariantValue;

public class SessionPlugin implements SessionPluginBase {
    public SessionPlugin() {
        System.out.println("Started");
    }

    @Override
    public void eval(Session session) throws Exception {
        String visitorId = session.getVisitorId();
        // look up a bunch of stuff here
        session.setUserZipCode("02445");
    }

    @Override
    public void newVariant(Session session, String experimentName, UUID experimentId,
            String variantName, UUID variantId, List<VariantValue> values) {
        System.out.println("Chose variant " + variantName + " for experiment " + experimentName);
    }

    @Override
    public void newImpression(Session session, Object impression) {
        if (impression instanceof Simple) {
            Simple simple = (Simple) impression;
            System.out.println("Simple impression with input: " + simple.getSimpleInput());
        }
    }

    @Override
    public void newEvent(Session session, Object impression, Object event) {
        if (event instanceof Simple.Click) {
            Simple.Click click = (Simple.Click) event;
            System.out.println("Simple click with value: " + click.getClickValue());
        }
        SessionPluginBase.super.newEvent(session, impression, event);
    }

}
