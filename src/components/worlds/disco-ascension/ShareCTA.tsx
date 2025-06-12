export default function ShareCTA() {
  return (
    <section className="section-padding bg-black text-center">
      <div className="content-container">
        <h2 className="text-title1 mb-8 text-white">Spread the Anomaly</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-amber-500/20 border border-amber-500/30 rounded text-amber-400">
            Share the Anomaly
          </button>
          <button className="px-6 py-3 bg-red-500/20 border border-red-500/30 rounded text-red-400">
            Report to Authorities
          </button>
        </div>
      </div>
    </section>
  );
}
