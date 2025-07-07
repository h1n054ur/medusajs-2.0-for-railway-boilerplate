import { defineWidgetConfig } from "@medusajs/admin-shared"
import { Container } from "@medusajs/ui"

// Product Insights Widget for individual product pages
const ThemedProductInsights = () => {
  // Mock data for demonstration
  const insights = {
    viewsThisWeek: 245,
    cartAdds: 18,
    purchases: 12,
    conversionRate: 4.9,
    trending: true
  }

  const getStatusColor = (rate: number) => {
    if (rate >= 4) return '#8acfd1' // Good (secondary color)
    if (rate >= 2) return '#fbe2a7' // Average (accent color)
    return '#f96f70' // Needs attention (destructive color)
  }

  const getStatusText = (rate: number) => {
    if (rate >= 4) return 'Excellent'
    if (rate >= 2) return 'Good'
    return 'Needs Attention'
  }

  return (
    <Container className="themed-product-widget">
      <style jsx>{`
        .themed-product-widget {
          background: linear-gradient(135deg, #b2e1eb 0%, #8acfd1 100%);
          border: 2px solid #8acfd1;
          border-radius: 8px;
          padding: 24px;
          margin: 16px 0;
          box-shadow: 3px 3px 0px 0px hsl(190 61% 70% / 0.50);
          font-family: 'Poppins', sans-serif;
        }
        
        .insights-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        
        .trending-badge {
          background: #d04f99;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .insight-card {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #8acfd1;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          backdrop-filter: blur(4px);
        }
        
        .insight-value {
          font-size: 24px;
          font-weight: 700;
          color: #5b5b5b;
          margin: 8px 0 4px 0;
        }
        
        .insight-label {
          font-size: 12px;
          color: #5b5b5b;
          font-weight: 500;
          margin: 0;
        }
        
        .conversion-status {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #8acfd1;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .status-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 8px;
        }
        
        .widget-title {
          color: #5b5b5b;
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>

      <div className="insights-header">
        <h3 className="widget-title">
          📈 Product Insights
        </h3>
        {insights.trending && (
          <div className="trending-badge">
            🔥 Trending
          </div>
        )}
      </div>

      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-value">{insights.viewsThisWeek}</div>
          <div className="insight-label">Views This Week</div>
        </div>

        <div className="insight-card">
          <div className="insight-value">{insights.cartAdds}</div>
          <div className="insight-label">Added to Cart</div>
        </div>

        <div className="insight-card">
          <div className="insight-value">{insights.purchases}</div>
          <div className="insight-label">Purchases</div>
        </div>
      </div>

      <div className="conversion-status">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div 
            className="status-indicator"
            style={{ backgroundColor: getStatusColor(insights.conversionRate) }}
          ></div>
          <span style={{ fontWeight: '600', color: '#5b5b5b' }}>
            Conversion Rate: {insights.conversionRate}%
          </span>
        </div>
        <span 
          style={{ 
            color: getStatusColor(insights.conversionRate),
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          {getStatusText(insights.conversionRate)}
        </span>
      </div>
    </Container>
  )
}

// Widget configuration - will appear on product detail pages
export const config = defineWidgetConfig({
  zone: ["product.details.after"],
})

export default ThemedProductInsights