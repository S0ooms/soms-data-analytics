# Olist SQL Analysis

## Overview
This project analyzes the **Olist Brazilian E-Commerce** dataset using MySQL. The full schema contains **8 tables** — `customers`, `orders`, `order_items`, `order_payments`, `order_reviews`, `products`, `sellers`, and `geolocation` — of which this project's 8 queries draw on **5**: `customers`, `orders`, `order_items`, `order_payments`, and `products` (reviews, sellers, and geolocation were out of scope for these particular business questions). The dataset covers **99,441 orders** from **~90,005 unique customers** across **74 product categories**. Order timestamps span **September 2016 through October 2018**, though 2016 is a thin launch period and the final two months (Sep–Oct 2018) show a near-total revenue drop-off (see Data Quality Notes below), so the analytically reliable window is roughly **January 2017 – August 2018**. Total revenue is ~**R$13.59M** on an order-item (price) basis and ~**R$16.0M** on a payments (`payment_value`) basis, the gap reflecting freight and installment interest captured in payments but not in item price.

**Data quality notes:**
- November 2016 is absent from the monthly revenue series entirely (no orders that month).
- September and October 2018 revenue collapses to R$4,439.54 and R$589.67 respectively — a >99% MoM drop that is far more consistent with an **incomplete data extract** at the tail end than an actual business collapse, and should be excluded from trend conclusions.
- Every one of the top 10 customers by lifetime spend has exactly **1 order** — a pattern investigated further in the findings below.

## Business Questions
1. Who are the top 10 customers by total amount spent?
2. What is the monthly revenue trend across the dataset?
3. What is the month-over-month change in revenue?
4. Which product categories generate the most revenue?
5. What are the top 3 products by revenue within each category?
6. How do customers segment into Low / Medium / High spend tiers?
7. How many customers are repeat buyers vs. one-time buyers?
8. What percent of total revenue comes from the top category?

## Key Findings

**1. Revenue is concentrated in a handful of categories, led by health & beauty.**
`beleza_saude` (health & beauty) is the single largest category, generating **R$1,258,681.34 — 9.26% of total order-item revenue** (Q8). It isn't an outlier in isolation: the top 5 categories — `beleza_saude`, `relogios_presentes`, `cama_mesa_banho`, `esporte_lazer`, and `informatica_acessorios` — together bring in **R$5.40M, roughly 40% of all revenue** (Q4), out of 74 categories total. This means inventory, supplier relationships, and marketing spend deliver disproportionate returns when focused on a short list of categories rather than spread evenly.

**2. The biggest spenders are one-time buyers, not loyal customers — a retention gap.**
Q1 shows that **all 10** of the highest lifetime-spend customers made **exactly one order** each (the top spender, R$13,664.08, came from a single transaction). That isn't a fluke: Q7 shows **87,347 of 90,005 customers (97.05%) are one-time buyers**, versus only **2,658 (2.95%) who are repeat buyers**. In other words, Olist's biggest revenue moments — and its customer base as a whole — are driven almost entirely by first-time, high-ticket purchases rather than a returning customer base. There is essentially no retention flywheel currently converting big spenders into repeat relationships.

**3. Revenue growth plateaued through 2018, and the reliable trend line ends in August.**
Q3's month-over-month view shows revenue climbing from R$138K (Jan 2017) to a peak of R$1.19M in Nov 2017 (a clear holiday/Black Friday spike), before settling into a **plateau of roughly R$1.0M–R$1.16M/month from Dec 2017 through Aug 2018** — flat, not growing. This plateau, on its own, is a signal that the business had stopped scaling before the dataset's apparent "collapse" in Sep–Oct 2018, which (per the data quality note above) is almost certainly a truncated extract rather than a real demand crash.

## Recommendations

1. **Launch a targeted retention program for high- and medium-tier one-time spenders.** With 97% of customers never returning (Q7) and the very highest spenders being single-order customers (Q1), a post-purchase win-back campaign (loyalty discount, restock reminder, or bundled offer) aimed at customers in the "high" and "medium" spend tiers from Q6 could convert a meaningful slice of that ~52% of the customer base into repeat buyers — directly reducing dependence on constantly acquiring new customers.

2. **Concentrate category investment on the top 5 revenue drivers, using Q5's top-products ranking to pick hero SKUs.** Since `beleza_saude`, `relogios_presentes`, `cama_mesa_banho`, `esporte_lazer`, and `informatica_acessorios` already generate ~40% of revenue from just 5 of 74 categories (Q4/Q8), prioritizing ad spend, supplier negotiation, and stock depth for these categories — anchored on the top 3 products per category identified in Q5 — should produce a higher return than distributing budget evenly across the long tail.

## Tools & Skills
- **MySQL** — joins, aggregations, CTEs, window functions (`ROW_NUMBER`, `LAG`, `SUM() OVER()`)
- **SQL techniques used:** multi-table `JOIN`s, `GROUP BY`/`HAVING`, `CASE WHEN` tiering, running/partitioned window functions, percent-of-total calculations
- Query results exported to CSV and analyzed for business narrative

## Files
| File | Description |
|---|---|
| `Q1_Top_Customers.sql` | Top 10 customers by total spend |
| `Q2_Monthly_Revenue.sql` | Monthly revenue trend |
| `Q3_MoM_Change.sql` | Month-over-month revenue change |
| `Q4_Categories_Highest_Revenue.sql` | Revenue by product category |
| `Q5_Top3_Products_per_Categories.sql` | Top 3 products per category |
| `Q6_Customer_Segment_Spend_Tiers.sql` | Customer spend tier segmentation |
| `Q7_RepeatBuyer_vs_OneTimeBuyer.sql` | Repeat vs. one-time buyer counts |
| `Q8_Percent_Total_Revenue_Top_Category.sql` | Top category's % of total revenue |
| `Q1_Result.csv` – `Q8_Result.csv` | Corresponding query result exports |