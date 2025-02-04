default result = {"result":"deny","details":"No rules matched"}

result = response {
    response := {"result":"allow","details":"rule condition met"}
    input.name == "Paras"
}