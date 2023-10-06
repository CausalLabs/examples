import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { initCausal, qb, Session, SessionContext, useFeature } from "../causal";
import { RatingWidget } from "../components/RatingWidget";
import { getOrGenDeviceId, products } from "../utils";

initCausal({defaultPageType:"SSR"});

export default function Page() {
  const router = useRouter();

  const session = new Session({ deviceId: getOrGenDeviceId(router) });

  const product = products[router.query.pid as keyof typeof products];
  if (product == undefined) {
    return <></>; // Product not found
  }

  return (
    <SessionContext.Provider value={session}>
      <ProductInfo product={product} />
    </SessionContext.Provider>
  );
}

export function ProductInfo({
  product,
}: {
  product: { name: string; url: string; next: string };
}) {
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const ratingBox = useFeature(qb().getRatingBox({ product: product.name }));
  const feature2 = useFeature(qb().getFeature2({exampleArg: "foo"}));

  useEffect(() => {
    if (ratingBox == "OFF") console.log("rating box is off");
    else if (ratingBox == undefined) console.log("rating box is undefined");
    else {
      console.log("rating box", ratingBox);
    }

    if (feature2 == "OFF") console.log("feature2 is off");
    else if (feature2 == undefined) console.log("feature2 is undefined");
    else {
      console.log("feature2", feature2);
    }

  }, [ratingBox, feature2]);

  return (
    <div className="center">
      <h1>{product.name}</h1>
      <img src={product.url} alt="product image" />

      {ratingBox != "OFF" && (
        <>
          {/* use impression data */}
          <h3>{ratingBox?.callToAction}</h3>
          <RatingWidget
            curRating={rating}
            onSetRating={(newRating) => {
              setRating(newRating);
              // wire up events
              ratingBox?.signalRating({ stars: newRating });
            }}
          />
          <a href={router.route + "?pid=" + product.next}>Rate Another</a>
        </>
      )}
    </div>
  );
}
