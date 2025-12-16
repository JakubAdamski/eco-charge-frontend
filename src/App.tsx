import React from 'react';
import './App.css';
import { DailyMixCharts } from './components/DailyMixCharts';
import { ChargingOptimizer } from './components/ChargingOptimizer';

function App() {
  return (
      <div className="App" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1>EcoCharge Dashboard 🇬🇧</h1>
          <p>Monitor the UK energy mix and charge your car ecologically.</p>
        </header>

        <main>

          <section>
            <DailyMixCharts />
          </section>

          <hr style={{ margin: '40px 0' }} />

          <section style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ChargingOptimizer />
          </section>
        </main>
      </div>
  );
}

export default App;