require 'test_helper'

class Api::V1::MailboxesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api_v1_mailbox = api_v1_mailboxes(:one)
  end

  test "should get index" do
    get api_v1_mailboxes_url, as: :json
    assert_response :success
  end

  test "should create api_v1_mailbox" do
    assert_difference('Api::V1::Mailbox.count') do
      post api_v1_mailboxes_url, params: { api_v1_mailbox: { location: @api_v1_mailbox.location, name: @api_v1_mailbox.name, user_id: @api_v1_mailbox.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show api_v1_mailbox" do
    get api_v1_mailbox_url(@api_v1_mailbox), as: :json
    assert_response :success
  end

  test "should update api_v1_mailbox" do
    patch api_v1_mailbox_url(@api_v1_mailbox), params: { api_v1_mailbox: { location: @api_v1_mailbox.location, name: @api_v1_mailbox.name, user_id: @api_v1_mailbox.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy api_v1_mailbox" do
    assert_difference('Api::V1::Mailbox.count', -1) do
      delete api_v1_mailbox_url(@api_v1_mailbox), as: :json
    end

    assert_response 204
  end
end
