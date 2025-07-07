import { Text, Section, Hr, Button } from '@react-email/components'
import * as React from 'react'
import { ThemedBase } from './themed-base'
import { OrderDTO, OrderAddressDTO } from '@medusajs/framework/types'

export const THEMED_ORDER_PLACED = 'themed-order-placed'

interface ThemedOrderPlacedProps {
  order: OrderDTO & { display_id: string; summary: { raw_current_order_total: { value: number } } }
  shippingAddress: OrderAddressDTO
  preview?: string
}

export const ThemedOrderPlacedTemplate: React.FC<ThemedOrderPlacedProps> = ({ 
  order, 
  shippingAddress, 
  preview = 'Your order has been placed successfully!' 
}) => {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100) // Assuming amount is in cents
  }

  return (
    <ThemedBase title="Order Confirmation" preview={preview}>
      {/* Welcome Message */}
      <Text style={{ 
        fontSize: '18px', 
        fontWeight: '600',
        color: '#5b5b5b',
        margin: '0 0 16px 0',
        lineHeight: '1.5'
      }}>
        Hi {shippingAddress.first_name} {shippingAddress.last_name}! 👋
      </Text>

      <Text style={{ 
        fontSize: '16px',
        color: '#5b5b5b',
        margin: '0 0 24px 0',
        lineHeight: '1.6'
      }}>
        Thank you for your order! We've received your order #{order.display_id} and it's being processed with care.
      </Text>

      {/* Order Summary Card */}
      <Section style={{
        backgroundColor: '#fdedc9',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '24px',
        border: '1px solid #d04f99'
      }}>
        <Text style={{ 
          fontSize: '18px', 
          fontWeight: '600',
          color: '#5b5b5b',
          margin: '0 0 16px 0'
        }}>
          📦 Order Summary
        </Text>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <Text style={{ fontSize: '14px', color: '#5b5b5b', margin: '0' }}>
            Order Number:
          </Text>
          <Text style={{ fontSize: '14px', fontWeight: '600', color: '#5b5b5b', margin: '0' }}>
            #{order.display_id}
          </Text>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <Text style={{ fontSize: '14px', color: '#5b5b5b', margin: '0' }}>
            Order Date:
          </Text>
          <Text style={{ fontSize: '14px', fontWeight: '600', color: '#5b5b5b', margin: '0' }}>
            {new Date(order.created_at).toLocaleDateString()}
          </Text>
        </div>
        
        <Hr style={{ margin: '16px 0', borderColor: '#d04f99' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: '16px', fontWeight: '700', color: '#d04f99', margin: '0' }}>
            Total:
          </Text>
          <Text style={{ fontSize: '16px', fontWeight: '700', color: '#d04f99', margin: '0' }}>
            {formatCurrency(order.summary.raw_current_order_total.value, order.currency_code)}
          </Text>
        </div>
      </Section>

      {/* Order Items */}
      <Section style={{ marginBottom: '24px' }}>
        <Text style={{ 
          fontSize: '18px', 
          fontWeight: '600',
          color: '#5b5b5b',
          margin: '0 0 16px 0'
        }}>
          🛍️ Your Items
        </Text>

        {order.items.map((item, index) => (
          <div key={item.id} style={{
            backgroundColor: index % 2 === 0 ? '#f6e6ee' : '#ffffff',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '8px',
            border: '1px solid #d04f99'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: '16px', 
                  fontWeight: '600',
                  color: '#5b5b5b',
                  margin: '0 0 4px 0'
                }}>
                  {item.product_title}
                </Text>
                <Text style={{ 
                  fontSize: '14px',
                  color: '#7a7a7a',
                  margin: '0'
                }}>
                  {item.title}
                </Text>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Text style={{ 
                  fontSize: '14px',
                  color: '#7a7a7a',
                  margin: '0 0 4px 0'
                }}>
                  Qty: {item.quantity}
                </Text>
                <Text style={{ 
                  fontSize: '16px', 
                  fontWeight: '600',
                  color: '#d04f99',
                  margin: '0'
                }}>
                  {formatCurrency(item.unit_price * item.quantity, order.currency_code)}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </Section>

      {/* Shipping Address */}
      <Section style={{
        backgroundColor: '#b2e1eb',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '24px',
        border: '1px solid #8acfd1'
      }}>
        <Text style={{ 
          fontSize: '18px', 
          fontWeight: '600',
          color: '#5b5b5b',
          margin: '0 0 16px 0'
        }}>
          🚚 Shipping Address
        </Text>
        
        <Text style={{ fontSize: '14px', color: '#5b5b5b', margin: '0 0 4px 0' }}>
          {shippingAddress.first_name} {shippingAddress.last_name}
        </Text>
        <Text style={{ fontSize: '14px', color: '#5b5b5b', margin: '0 0 4px 0' }}>
          {shippingAddress.address_1}
        </Text>
        <Text style={{ fontSize: '14px', color: '#5b5b5b', margin: '0 0 4px 0' }}>
          {shippingAddress.city}, {shippingAddress.province} {shippingAddress.postal_code}
        </Text>
        <Text style={{ fontSize: '14px', color: '#5b5b5b', margin: '0' }}>
          {shippingAddress.country_code}
        </Text>
      </Section>

      {/* Action Button */}
      <Section style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Button
          href={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/order/confirmed/${order.display_id}`}
          style={{
            backgroundColor: '#d04f99',
            color: '#ffffff',
            padding: '16px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'inline-block',
            fontWeight: '600',
            fontSize: '16px',
            boxShadow: '3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 0.50)'
          }}
        >
          View Order Details
        </Button>
      </Section>

      {/* Footer Message */}
      <Text style={{ 
        fontSize: '14px',
        color: '#7a7a7a',
        textAlign: 'center',
        margin: '0',
        lineHeight: '1.5'
      }}>
        We'll send you another email when your order ships. If you have any questions, 
        feel free to contact our support team.
      </Text>
    </ThemedBase>
  )
}

export default ThemedOrderPlacedTemplate