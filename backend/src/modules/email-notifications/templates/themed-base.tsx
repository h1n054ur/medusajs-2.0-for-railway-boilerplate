import { Html, Head, Body, Container, Section, Preview } from '@react-email/components'
import * as React from 'react'

interface ThemedBaseProps {
  title?: string
  preview?: string
  children: React.ReactNode
}

export const ThemedBase: React.FC<ThemedBaseProps> = ({ 
  title = "Medusa Store", 
  preview, 
  children 
}) => {
  return (
    <Html>
      <Head>
        <style>{`
          :root {
            --primary: #d04f99;
            --secondary: #8acfd1;
            --background: #f6e6ee;
            --card: #fdedc9;
            --foreground: #5b5b5b;
            --muted: #7a7a7a;
            --border: #d04f99;
            --radius: 8px;
          }
          
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        `}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body style={{ 
        backgroundColor: '#f6e6ee', 
        fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        margin: '0',
        padding: '20px'
      }}>
        <Container style={{ 
          margin: '0 auto', 
          maxWidth: '600px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '3px 3px 0px 0px hsl(325.78 58.18% 56.86% / 0.50)'
        }}>
          {/* Header */}
          <Section style={{
            backgroundColor: '#fdedc9',
            padding: '32px',
            textAlign: 'center',
            borderBottom: '2px solid #d04f99'
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#5b5b5b',
              margin: '0',
              letterSpacing: '-0.5px'
            }}>
              {title}
            </h1>
          </Section>

          {/* Content */}
          <Section style={{
            padding: '32px',
            backgroundColor: '#ffffff'
          }}>
            {children}
          </Section>

          {/* Footer */}
          <Section style={{
            backgroundColor: '#f6e6ee',
            padding: '24px',
            textAlign: 'center',
            borderTop: '1px solid #d04f99'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#7a7a7a',
              margin: '0 0 8px 0'
            }}>
              Thank you for shopping with us!
            </p>
            <p style={{
              fontSize: '12px',
              color: '#7a7a7a',
              margin: '0'
            }}>
              © {new Date().getFullYear()} Medusa Store. All rights reserved.
            </p>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}