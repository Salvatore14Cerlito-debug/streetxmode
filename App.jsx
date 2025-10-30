import React, { useMemo, useState } from "react";

const CONTACT = {
  instagramUser: "streetmodex_14",
};

const CATEGORIES = [
  { id: "schuhe", label: "Schuhe", emoji: "👟" },
  { id: "klamotten", label: "Klamotten", emoji: "👕" },
  { id: "jacken", label: "Jacken", emoji: "🧥" },
  { id: "accessoires", label: "Accessoires", emoji: "🧢" },
];

const PRODUCTS = [
  { id: "s1", title: "Street Sneaker Black Edition", category: "schuhe", img: "/images/schuh1.jpeg" },
  { id: "s2", title: "Luxury Runner White/Black", category: "schuhe", img: "/images/schuh2.jpeg" },
  { id: "s3", title: "Classic Boot LV Style", category: "schuhe", img: "/images/schuh3.jpeg" },
  { id: "k1", title: "Oversized Tee – SMX", category: "klamotten", img: "https://via.placeholder.com/600x400?text=Klamotten" },
  { id: "j1", title: "Puffer Jacket Lite", category: "jacken", img: "https://via.placeholder.com/600x400?text=Jacke" },
  { id: "a1", title: "Dad Cap Classic", category: "accessoires", img: "https://via.placeholder.com/600x400?text=Cap" },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("schuhe");
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  const addToCart = (p) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === p.id);
      if (existing) {
        return prev.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...prev, { id: p.id, title: p.title, qty: 1 }];
    });
  };

  const changeQty = (id, dir) => {
    setCart((prev) =>
      prev.map((x) =>
        x.id === id ? { ...x, qty: Math.max(1, x.qty + dir) } : x
      )
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((x) => x.id !== id));

  const clearCart = () => setCart([]);

  const buildOrderText = () => {
    const items = cart.map((x, i) => `${i + 1}. ${x.title}  x${x.qty}`).join("\n");
    return `🛍️ BESTELLANFRAGE – StreetModeX

Produkte:
${items || "Keine Auswahl"}

ℹ️ Preise, Zahlung & Details bekommst du privat in den DMs.

💳 Zahlung: Nur PayPal oder Überweisung
🚚 Lieferzeit: ca. 2 Wochen

Schreib uns auf Instagram 👉 @${CONTACT.instagramUser}`;
  };

  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(buildOrderText());
      alert("Text kopiert! Jetzt in Instagram-DM einfügen.");
    } catch {
      alert("Konnte nicht kopieren – bitte manuell markieren & kopieren.");
    }
  };

  const openInstagram = () => {
    window.open(`https://instagram.com/${CONTACT.instagramUser}`, "_blank");
  };

  // ==== STYLES ====
  const container = { fontFamily: "system-ui, -apple-system, sans-serif", background: "#f9fafb", minHeight: "100vh" };
  const section = { background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: 16, boxShadow: "0 1px 6px rgba(0,0,0,.05)" };

  return (
    <div style={container}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          background: "#111",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: 22 }}>StreetModeX</h1>
        <button
          onClick={() => setMenuOpen((p) => !p)}
          style={{
            background: "transparent",
            border: "1px solid #fff",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: 8,
          }}
        >
          ☰
        </button>
      </header>

      {/* NAV */}
      {menuOpen && (
        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            padding: "10px 0",
            background: "#fff",
            borderBottom: "1px solid #eee",
          }}
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCategory(c.id);
                setMenuOpen(false);
              }}
              style={{
                padding: "8px 12px",
                borderRadius: 10,
                border: "1px solid #111",
                background: selectedCategory === c.id ? "#111" : "#fff",
                color: selectedCategory === c.id ? "#fff" : "#111",
              }}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </nav>
      )}

      {/* CONTENT */}
      <main
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 16,
          padding: 16,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <section style={section}>
          <h2 style={{ marginTop: 0, fontSize: 20 }}>
            {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {visibleProducts.map((p) => (
              <div key={p.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 12 }}>
                <img
                  src={p.img}
                  alt={p.title}
                  style={{ width: "100%", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <div style={{ padding: 12 }}>
                  <h3 style={{ fontSize: 16 }}>{p.title}</h3>
                  <p style={{ color: "#6b7280" }}>Preis auf Anfrage (DM)</p>
                  <button
                    style={{
                      width: "100%",
                      background: "#111",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 0",
                      cursor: "pointer",
                    }}
                    onClick={() => addToCart(p)}
                  >
                    In den Einkaufswagen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={section}>
          <h2 style={{ fontSize: 20, marginTop: 0 }}>🛒 Einkaufswagen</h2>
          {cart.length === 0 ? (
            <p style={{ color: "#6b7280" }}>Noch keine Produkte im Wagen.</p>
          ) : (
            cart.map((x) => (
              <div
                key={x.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                  padding: "8px 0",
                }}
              >
                <div>
                  <strong>{x.title}</strong>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>x{x.qty}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => changeQty(x.id, -1)}>–</button>
                  <button onClick={() => changeQty(x.id, +1)}>+</button>
                  <button onClick={() => removeFromCart(x.id)}>🗑️</button>
                </div>
              </div>
            ))
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <button onClick={clearCart} style={{ background: "#fff", border: "1px solid #ccc", borderRadius: 8, padding: "6px 10px" }}>
              Wagen leeren
            </button>
          </div>

          <hr style={{ margin: "16px 0" }} />

          <p style={{ fontSize: 14, color: "#333", lineHeight: 1.5 }}>
            <strong>Wichtig:</strong> Preise, Zahlung & Details bekommst du <strong>privat in den DMs</strong>.<br />
            💳 Zahlung: Nur PayPal oder Überweisung<br />
            🚚 Lieferzeit: ca. 2 Wochen<br />
            📩 Kontakt:{" "}
            <a href={`https://instagram.com/${CONTACT.instagramUser}`} target="_blank" rel="noreferrer">
              @{CONTACT.instagramUser}
            </a>
          </p>

          <div style={{ display: "grid", gap: 8 }}>
            <button
              onClick={copyOrder}
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px",
              }}
            >
              Bestelltext kopieren
            </button>
            <button
              onClick={openInstagram}
              style={{
                background: "#fff",
                border: "1px solid #111",
                borderRadius: 8,
                padding: "10px",
              }}
            >
              Instagram DM öffnen
            </button>
          </div>
        </section>
      </main>

      <footer style={{ textAlign: "center", padding: 16, color: "#6b7280", fontSize: 13 }}>
        © {new Date().getFullYear()} StreetModeX – Alle Rechte vorbehalten.
      </footer>
    </div>
  );
}
