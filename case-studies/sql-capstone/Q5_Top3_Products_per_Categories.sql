-- Q5: Rank the top 3 products within each category by revenue.
-- Hint: ROW_NUMBER, PARTITION BY, CTE
use olist;

with product_revenue as (
    select
        p.product_category_name as category,
        oi.product_id,
        sum(oi.price) as revenue
    from products p
    inner join order_items oi
        on p.product_id = oi.product_id
    group by
        p.product_category_name,
        oi.product_id
),
ranked_products as (
    select
        category,
        product_id,
        revenue,
        row_number() over (
            partition by category
            order by revenue desc
        ) as product_rank
    from product_revenue
)
select
    category,
    product_id,
    revenue,
    product_rank
from ranked_products
where product_rank <= 3
order by category, product_rank;
