CREATE OR REPLACE FUNCTION uuid62()
RETURNS text AS $$
    DECLARE id text;
BEGIN
    SELECT array_to_string(
        ARRAY(
	    SELECT substr('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
	        trunc((random() * 62) + 1)::integer, 1)
    FROM generate_series(1,22)),'') INTO id;
    RETURN id;
END;
$$
LANGUAGE plpgsql;