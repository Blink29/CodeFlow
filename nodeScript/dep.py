def sum(a, b):
    return a + b


def sub(a, b):
    return a - b


def mul(a, b):
    result = 0
    for _ in range(b):
        result = sum(result, a)
    return result


def div(a, b):
    result = 0
    while a >= b:
        a = sub(a, b)
        result = sum(result, 1)
    return result
