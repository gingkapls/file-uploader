WITH RECURSIVE all_children
AS (
    SELECT
        *
    FROM
        "File"
    WHERE
        ("File"."parentId"::text = $1
        OR ($1 IS NULL AND "File"."parentId" IS NULL))

        AND "File"."ownerId" = $2

    UNION

    SELECT
        f.*
    FROM
        "File" f
        INNER JOIN all_children as ac ON ac."id" = f."parentId"
)

-- @param {String} $1:parentId?
-- @param {Int} $2:ownerId
SELECT * FROM all_children;
