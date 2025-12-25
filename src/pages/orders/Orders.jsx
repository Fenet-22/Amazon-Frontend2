import React, { useEffect, useState } from "react";
import styles from "./orders.module.css";
import { useUser } from "../../context/UserContext";
import { db } from "../../utility/firebase";
import { collection, onSnapshot, orderBy, query, doc } from "firebase/firestore";
import ProductCard from "../../Components/Products/ProductCard";

function Orders() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const ordersRef = collection(userRef, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Your Orders</h1>

      {orders.length === 0 ? (
        <div className={styles.emptyOrders}>
          <p>You don't have any orders yet.</p>
          <p>Start shopping to place your first order!</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className={styles.order}>
            <p className={styles.orderId}>
              <strong>Order ID:</strong> {order.id}
            </p>

            {order.data.basket?.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                flex={true}
                showAddToCart={false} // hides the button for orders
              />
            ))}
          </div>
        ))
      )}
    </section>
  );
}

export default Orders;
