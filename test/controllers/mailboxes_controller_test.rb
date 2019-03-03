require 'test_helper'

class MailboxesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @mailbox = mailboxes(:one)
  end

  test "should get index" do
    get mailboxes_url, as: :json
    assert_response :success
  end

  test "should create mailbox" do
    assert_difference('Mailbox.count') do
      post mailboxes_url, params: { mailbox: { alias: @mailbox.alias, user_id: @mailbox.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show mailbox" do
    get mailbox_url(@mailbox), as: :json
    assert_response :success
  end

  test "should update mailbox" do
    patch mailbox_url(@mailbox), params: { mailbox: { alias: @mailbox.alias, user_id: @mailbox.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy mailbox" do
    assert_difference('Mailbox.count', -1) do
      delete mailbox_url(@mailbox), as: :json
    end

    assert_response 204
  end
end
