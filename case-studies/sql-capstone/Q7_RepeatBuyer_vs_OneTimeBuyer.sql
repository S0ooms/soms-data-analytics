-- Q7: How many customers are repeat buyers vs one-time buyers?
-- Hint: GROUP BY, HAVING, COUNT
use olist;

with customer_orders as (
    select
        o.order_id,
        c.customer_unique_id,
        row_number() over (
            partition by c.customer_unique_id
            order by o.order_id
        ) as purchase_number
    from orders o
    inner join customers c
        on o.customer_id = c.customer_id
),
customer_purchase_counts as (
    select
        customer_unique_id,
        max(purchase_number) as total_purchase
    from customer_orders
    group by customer_unique_id
)
select
    case
        when total_purchase = 1 then 'one_time_buyer'
        else 'repeat_buyer'
    end as customer_type,
    count(*) as customer_count
from customer_purchase_counts
group by customer_type;
