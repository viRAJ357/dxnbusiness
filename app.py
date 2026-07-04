import streamlit as st
import os

# Page configuration for a premium look
port = os.getenv("PORT", "8501")
st.set_page_config(
    page_title="DXN Business Dashboard",
    page_icon=":bar_chart:",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Custom CSS for glassmorphism effect and smooth animations
st.markdown(
    """
    <style>
    /* Glassmorphism container */
    .glass {
        backdrop-filter: blur(12px) saturate(180%);
        -webkit-backdrop-filter: blur(12px) saturate(180%);
        background-color: rgba(255, 255, 255, 0.25);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        padding: 2rem;
        margin-top: 1rem;
    }
    /* Smooth hover transition */
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        transition: all 0.3s ease;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

# Header
st.title("🚀 DXN Business Dashboard")
st.subheader("Real‑time insights with a sleek, premium UI")

# Example metric cards inside a glass container
with st.container():
    st.markdown('<div class="glass">', unsafe_allow_html=True)
    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.metric(label="Revenue", value="$1.2M", delta="+5%")
        st.markdown("</div>", unsafe_allow_html=True)
    with col2:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.metric(label="Active Users", value="8,542", delta="+8%")
        st.markdown("</div>", unsafe_allow_html=True)
    with col3:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.metric(label="Conversion Rate", value="3.7%", delta="-0.2%")
        st.markdown("</div>", unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

# Sample data visualization
st.markdown("---")
st.header("Monthly Sales Trend")
import pandas as pd
import numpy as np

# Dummy data for demonstration
months = pd.date_range(start="2023-01-01", periods=12, freq="M")
sales = np.random.randint(80, 150, size=12)
df = pd.DataFrame({"Month": months.strftime('%b %Y'), "Sales": sales})

st.line_chart(df.set_index("Month"))

# Footer with subtle animation
st.markdown(
    """
    <script>
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.transition = 'opacity 2s';
        footer.style.opacity = 0.6;
    }
    </script>
    """,
    unsafe_allow_html=True,
)
