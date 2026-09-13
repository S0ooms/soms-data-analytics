-- Q3: What is the month-over-month change in revenue?
-- Hint: CTE, LAG, window function
use olist;

with monthly_revenue as (
    select
        date_format(order_purchase_timestamp, '%Y-%m') as month,
        sum(op.payment_value) as revenue
    from orders o
    inner join order_payments op
        on o.order_id = op.order_id
    group by date_format(order_purchase_timestamp, '%Y-%m')
)
select
    month,
    revenue,
    lag(revenue) over (
        order by month
    ) as previous_month_revenue,
    revenue - lag(revenue) over (
        order by month
    ) as mom_change
from monthly_revenue
order by month;