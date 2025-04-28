import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Define styles as an object
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    gap: '32px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  chartContainer: {
    height: '384px',
  },
  smallChartContainer: {
    height: '256px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '24px',
  },
  select: {
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    width: '100%',
    marginBottom: '16px',
  },
  selectContainer: {
    marginBottom: '16px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    minWidth: '100%',
    backgroundColor: 'white',
  },
  tableHead: {
    backgroundColor: '#e5e7eb',
    color: '#4b5563',
    textTransform: 'uppercase',
    fontSize: '14px',
    lineHeight: '20px',
  },
  tableHeadSecondary: {
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    fontSize: '14px',
    lineHeight: '20px',
  },
  tableHeadCell: {
    padding: '12px 24px',
    textAlign: 'left',
  },
  tableHeadCellCenter: {
    padding: '12px 8px',
    textAlign: 'center',
  },
  tableBody: {
    color: '#4b5563',
    fontSize: '14px',
  },
  tableRow: {
    borderBottom: '1px solid #e5e7eb',
  },
  tableRowHover: {
    ':hover': {
      backgroundColor: '#f3f4f6',
    },
  },
  tableCell: {
    padding: '12px 24px',
    textAlign: 'left',
  },
  tableCellCenter: {
    padding: '12px 8px',
    textAlign: 'center',
  },
};

// Media query for larger screens
const mediaQuery = window.matchMedia('(min-width: 768px)');
if (mediaQuery.matches) {
  styles.gridContainer.gridTemplateColumns = '1fr 1fr';
}

const NetworkDensityVisualizer = () => {
  // Updated dataset based on the provided tables
  // Table 1: Network information
  const networkInfo = [
    { network: 'AS-733', nodes: 1486, edges: 3172, domain: 'Internet AS' },
    { network: 'AS-Caida', nodes: 26475, edges: 106762, domain: 'Internet AS' },
    { network: 'CA-HepTh', nodes: 9877, edges: 51971, domain: 'Collaboration' },
    { network: 'Netscience', nodes: 1589, edges: 2742, domain: 'Collaboration' },
    { network: 'Yeast', nodes: 1460, edges: 1950, domain: 'Biological' }
  ];

// Table 2: Edge density (h = 2)
const edgeDensityData = [
  { dataset: 'AS-733',    algorithm: 'Exact',      time: 598.0,  density: 8.00, memory: 0.10 },
  { dataset: 'AS-733',    algorithm: 'CoreExact',  time: 284.5,  density: 8.00, memory: 0.05 },
  { dataset: 'AS-Caida',  algorithm: 'Exact',      time: 9025.0, density: 0.14, memory: 1.20 },
  { dataset: 'AS-Caida',  algorithm: 'CoreExact',  time: 4230.0, density: 0.14, memory: 0.30 },
  { dataset: 'CA-HepTh',  algorithm: 'Exact',      time: 2490.0, density: 1.00, memory: 0.50 },
  { dataset: 'CA-HepTh',  algorithm: 'CoreExact',  time: 1182.0, density: 1.00, memory: 0.10 },
  { dataset: 'Netscience',algorithm: 'Exact',      time: 35.0,   density: 9.40, memory: 0.30 },
  { dataset: 'Netscience',algorithm: 'CoreExact',  time: 16.5,   density: 9.40, memory: 0.08 },
  { dataset: 'Yeast',     algorithm: 'Exact',      time: 54.5,   density: 3.10, memory: 0.08 },
  { dataset: 'Yeast',     algorithm: 'CoreExact',  time: 25.8,   density: 3.10, memory: 0.02 }
];

// Table 3: Clique‐density results for h = 3, 4
const higherOrderData = [
  { dataset: 'AS-733',     h: 3, density: 31.0,   exactTime: 1375.0,   coreExactTime: 655.0   },
  { dataset: 'AS-733',     h: 4, density: 68.5,   exactTime: 2775.0,   coreExactTime: 1310.9 },
  { dataset: 'AS-Caida',   h: 3, density: 22.0,   exactTime: 11530.0,  coreExactTime: 5404.7 },
  { dataset: 'AS-Caida',   h: 4, density: 85.0,   exactTime: 23005.5,  coreExactTime: 10770.4},
  { dataset: 'CA-HepTh',   h: 3, density: 155.0,  exactTime: 5750.3,   coreExactTime: 2730.0 },
  { dataset: 'CA-HepTh',   h: 4, density: 242.0,  exactTime: 11510.0,  coreExactTime: 5302.0 },
  { dataset: 'Netscience', h: 3, density: 57.2,   exactTime:   80.0,   coreExactTime:   38.4 },
  { dataset: 'Netscience', h: 4, density: 242.3,  exactTime:  165.7,   coreExactTime:   78.5 },
  { dataset: 'Yeast',      h: 3, density: 57.2,   exactTime:  125.8,   coreExactTime:   60.5 },
  { dataset: 'Yeast',      h: 4, density: 242.3,  exactTime:  250.0,   coreExactTime:  120.0 }
];

  // Prepare data for the comparison between edge and clique densities
  const prepareEdgeVsCliqueData = () => {
    const datasets = ['AS-733', 'CA-HepTh', 'Netscience'];
    return datasets.map(ds => {
      const edgeData = edgeDensityData.find(item => item.dataset === ds && item.algorithm === 'Exact');
      const cliqueData3 = higherOrderData.find(item => item.dataset === ds && item.h === 3);
      const cliqueData4 = higherOrderData.find(item => item.dataset === ds && item.h === 4);
      
      return {
        name: ds,
        edgeDensity: edgeData ? edgeData.density : 0,
        cliqueDensity3: cliqueData3 ? cliqueData3.density : 0,
        cliqueDensity4: cliqueData4 ? cliqueData4.density : 0
      };
    });
  };

  // Prepare data for the algorithm comparison
  const prepareAlgorithmComparisonData = () => {
    const datasets = ['AS-733', 'AS-Caida', 'CA-HepTh', 'Netscience', 'Yeast'];
    return datasets.map(ds => {
      const exactData = edgeDensityData.find(item => item.dataset === ds && item.algorithm === 'Exact');
      const coreExactData = edgeDensityData.find(item => item.dataset === ds && item.algorithm === 'CoreExact');
      
      return {
        name: ds,
        exactTime: exactData ? exactData.time : 0,
        coreExactTime: coreExactData ? coreExactData.time : 0,
        speedup: exactData && coreExactData ? exactData.time / coreExactData.time : 0
      };
    });
  };

  // Prepare data for the performance radar chart
  const preparePerformanceRadarData = () => {
    const datasets = ['AS-733', 'CA-HepTh', 'Netscience', 'Yeast'];
    return datasets.map(ds => {
      const exactData = edgeDensityData.find(item => item.dataset === ds && item.algorithm === 'Exact');
      const h3Data = higherOrderData.find(item => item.dataset === ds && item.h === 3);
      
      return {
        dataset: ds,
        memory: exactData ? exactData.memory * 10 : 0, // Scale for visibility
        time: exactData ? Math.min(exactData.time, 50) : 0, // Cap at 50 for visibility
        density: exactData ? exactData.density : 0,
        h3density: h3Data ? h3Data.density / 10 : 0 // Scale for visibility
      };
    });
  };

  // Prepare data for density overview
  const densityOverviewData = [
    { name: 'Edge (h=2)', AS_733: 8.00, AS_Caida: 0.14, CA_HepTh: 1.00, Netscience: 9.40, Yeast: 3.10 },
    { name: '3-Clique', AS_733: 31.0, CA_HepTh: 155, Netscience: 57.2 },
    { name: '4-Clique', AS_733: 68.5, CA_HepTh: 242.0, Netscience: 242.3 }
  ];

  // State to track the selected dataset for comparison
  const [selectedDataset, setSelectedDataset] = useState('AS-733');

  // Chart color scheme
  const colors = {
    exact: '#8884d8',
    coreExact: '#82ca9d',
    edgeDensity: '#ffc658',
    cliqueDensity3: '#ff8042',
    cliqueDensity4: '#ff4560',
    AS_733: '#8884d8',
    AS_Caida: '#82ca9d',
    CA_HepTh: '#ffc658',
    Netscience: '#ff8042',
    Yeast: '#ff4560'
  };

  // Find the higher order data for the selected dataset
  const getHigherOrderDataForDataset = () => {
    return higherOrderData.filter(item => item.dataset === selectedDataset);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Network Density Analysis
      </h1>
      
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Density Overview</h2>
        <div style={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={densityOverviewData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => value ? value.toFixed(2) : 'N/A'} />
              <Legend />
              <Bar dataKey="AS_733" name="AS-733" fill={colors.AS_733} />
              <Bar dataKey="AS_Caida" name="AS-Caida" fill={colors.AS_Caida} />
              <Bar dataKey="CA_HepTh" name="CA-HepTh" fill={colors.CA_HepTh} />
              <Bar dataKey="Netscience" fill={colors.Netscience} />
              <Bar dataKey="Yeast" fill={colors.Yeast} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div style={styles.gridContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Algorithm Performance Comparison</h2>
          <div style={styles.smallChartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={prepareAlgorithmComparisonData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => value.toFixed(2)} />
                <Legend />
                <Bar dataKey="exactTime" name="Exact Time (s)" fill={colors.exact} />
                <Bar dataKey="coreExactTime" name="CoreExact Time (s)" fill={colors.coreExact} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Edge vs Clique Density</h2>
          <div style={styles.smallChartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={prepareEdgeVsCliqueData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => value.toFixed(2)} />
                <Legend />
                <Bar dataKey="edgeDensity" name="Edge Density (h=2)" fill={colors.edgeDensity} />
                <Bar dataKey="cliqueDensity3" name="3-Clique Density" fill={colors.cliqueDensity3} />
                <Bar dataKey="cliqueDensity4" name="4-Clique Density" fill={colors.cliqueDensity4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      </div>
      
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Network Information</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.tableHeadCell}>Network</th>
                <th style={styles.tableHeadCellCenter}>Nodes |V|</th>
                <th style={styles.tableHeadCellCenter}>Edges |E|</th>
                <th style={styles.tableHeadCellCenter}>Domain</th>
              </tr>
            </thead>
            <tbody style={styles.tableBody}>
              {networkInfo.map((network, index) => (
                <tr key={index} style={{...styles.tableRow, ...styles.tableRowHover}}>
                  <td style={styles.tableCell}>{network.network}</td>
                  <td style={styles.tableCellCenter}>{network.nodes.toLocaleString()}</td>
                  <td style={styles.tableCellCenter}>{network.edges.toLocaleString()}</td>
                  <td style={styles.tableCellCenter}>{network.domain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Edge Density Performance (h=2)</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.tableHeadCell}>Dataset</th>
                <th style={styles.tableHeadCellCenter}>Algorithm</th>
                <th style={styles.tableHeadCellCenter}>Time (s)</th>
                <th style={styles.tableHeadCellCenter}>Density ρ₂</th>
                <th style={styles.tableHeadCellCenter}>Memory (GB)</th>
              </tr>
            </thead>
            <tbody style={styles.tableBody}>
              {edgeDensityData.map((item, index) => (
                <tr key={index} style={{...styles.tableRow, ...styles.tableRowHover}}>
                  <td style={styles.tableCell}>{item.dataset}</td>
                  <td style={styles.tableCellCenter}>{item.algorithm}</td>
                  <td style={styles.tableCellCenter}>{item.time.toFixed(2)}</td>
                  <td style={styles.tableCellCenter}>{item.density.toFixed(2)}</td>
                  <td style={styles.tableCellCenter}>{item.memory.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Clique Density Results (h=3,4)</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.tableHeadCell}>Dataset</th>
                <th style={styles.tableHeadCellCenter}>h</th>
                <th style={styles.tableHeadCellCenter}>Density ρₕ</th>
                <th style={styles.tableHeadCellCenter}>Exact Time (s)</th>
                <th style={styles.tableHeadCellCenter}>CoreExact Time (s)</th>
                <th style={styles.tableHeadCellCenter}>Speedup</th>
              </tr>
            </thead>
            <tbody style={styles.tableBody}>
              {higherOrderData.map((item, index) => (
                <tr key={index} style={{...styles.tableRow, ...styles.tableRowHover}}>
                  <td style={styles.tableCell}>{item.dataset}</td>
                  <td style={styles.tableCellCenter}>{item.h}</td>
                  <td style={styles.tableCellCenter}>{item.density.toFixed(1)}</td>
                  <td style={styles.tableCellCenter}>{item.exactTime.toFixed(1)}</td>
                  <td style={styles.tableCellCenter}>{item.coreExactTime.toFixed(2)}</td>
                  <td style={styles.tableCellCenter}>{(item.exactTime / item.coreExactTime).toFixed(1)}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NetworkDensityVisualizer;