-- Q6: Segment customers into spend tiers (Low / Medium / High).
-- Hint: CTE, CASE WHEN
use olist;

with customer_spending as (
    select
        o.customer_id,
        sum(op.payment_value) as total_spend
    from orders o
    inner join order_payments op
        on o.order_id = op.order_id
    group by o.customer_id
)
select
    customer_id,
    total_spend,
    case
        when total_spend < 100 then 'low'
        when total_spend < 500 then 'medium'
        else 'high'
    end as spend_tier
from customer_spending
order by total_spend desc;
