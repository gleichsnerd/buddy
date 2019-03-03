require 'test_helper'

class AddressBooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @address_book = address_books(:one)
  end

  test "should get index" do
    get address_books_url, as: :json
    assert_response :success
  end

  test "should create address_book" do
    assert_difference('AddressBook.count') do
      post address_books_url, params: { address_book: { mailbox_id: @address_book.mailbox_id, user_id: @address_book.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show address_book" do
    get address_book_url(@address_book), as: :json
    assert_response :success
  end

  test "should update address_book" do
    patch address_book_url(@address_book), params: { address_book: { mailbox_id: @address_book.mailbox_id, user_id: @address_book.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy address_book" do
    assert_difference('AddressBook.count', -1) do
      delete address_book_url(@address_book), as: :json
    end

    assert_response 204
  end
end
