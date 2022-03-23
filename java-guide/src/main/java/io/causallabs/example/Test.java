package io.causallabs.example;

import io.causallabs.runtime.CausalClient;

class Test {

    final String impressionId = "impressionId";

    public void main() throws Exception {
        SessionRequest s = new SessionRequest("testVisitorId", "testArrivalId");
        SimpleRequest req = new SimpleRequest(123);
        CausalClient.getInstance().request(s, "impressionId", req);
        req.getTestOutput();
        req.signalClick(10);
    }

    public void remoteClickExample() {
        SessionRequest s = SessionRequest.fromArrivalId("testArrivalId");
        SimpleRequest.signalClick(s, impressionId, 10);
    }
}
