-- Q8: What percent of total revenue comes from the top category?
-- Hint: SUM() OVER (), percent-of-total
use olist;

with category_revenue as (
    select
        p.product_category_name as category,
        sum(oi.price) as revenue
    from products p
    inner join order_items oi
        on p.product_id = oi.product_id
    group by p.product_category_name
)
select
    category,
    revenue,
    sum(revenue) over () as total_revenue,
    round(
        revenue / sum(revenue) over () * 100,
        2
    ) as percent_of_total
from category_revenue
order by revenue desc;
