import { defineWidgetConfig } from "@medusajs/admin-shared"
import { Container, Heading } from "@medusajs/ui"
import { useState, useEffect } from "react"

// Themed Dashboard Stats Widget
const ThemedDashboardStats = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    newCustomers: 0,
    productsSold: 0
  })

  useEffect(() => {
    // Simulate fetching dashboard stats
    // In a real implementation, you would fetch from your API
    const fetchStats = async () => {
      // Mock data for demonstration
      setStats({
        totalOrders: 1250,
        totalRevenue: 45231.89,
        newCustomers: 156,
        productsSold: 2890
      })
    }

    fetchStats()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <Container className="themed-admin-widget">
      <style jsx>{`
        .themed-admin-widget {
          background: linear-gradient(135deg, #f6e6ee 0%, #fdedc9 100%);
          border: 2px solid #d04f99;
          border-radius: 8px;
          padding: 24px;
          margin: 16px 0;
          box-shadow: 3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 0.50);
          font-family: 'Poppins', sans-serif;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }
        
        .stat-card {
          background: #ffffff;
          border: 1px solid #d04f99;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 2px 2px 0px 0px #d04f99;
        }
        
        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #d04f99;
          margin: 8px 0 4px 0;
          line-height: 1.2;
        }
        
        .stat-label {
          font-size: 14px;
          color: #5b5b5b;
          font-weight: 500;
          margin: 0;
        }
        
        .stat-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }
        
        .widget-title {
          color: #5b5b5b;
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .widget-subtitle {
          color: #7a7a7a;
          font-size: 14px;
          margin: 0 0 16px 0;
        }
      `}</style>

      <div className="widget-header">
        <h2 className="widget-title">
          📊 Store Analytics
        </h2>
        <p className="widget-subtitle">
          Quick overview of your store performance
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🛍️</div>
          <div className="stat-value">{stats.totalOrders.toLocaleString()}</div>
          <div className="stat-label">Total Orders</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">{formatCurrency(stats.totalRevenue)}</div>
          <div className="stat-label">Total Revenue</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{stats.newCustomers.toLocaleString()}</div>
          <div className="stat-label">New Customers</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-value">{stats.productsSold.toLocaleString()}</div>
          <div className="stat-label">Products Sold</div>
        </div>
      </div>
    </Container>
  )
}

// Widget configuration - will appear on the dashboard home page
export const config = defineWidgetConfig({
  zone: ["dashboard.after"],
})

export default ThemedDashboardStats