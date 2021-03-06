module Api::V1
  class MailboxesController < ApiController
    before_action :set_mailbox, only: [:show, :update, :destroy]

    # GET /mailboxes
    def index
        @mailboxes = Mailbox.where(user: current_user)

        if params['letters']
            render json: @mailboxes.as_json(:include => { :letters => {:only => [:id]}})
        else
            render json: @mailboxes
        end
    end

    # GET /mailboxes/1
    def show
      render json: @mailbox.as_json
    end

    # POST /mailboxes
    def create
      @mailbox = Mailbox.new(mailbox_params)

      if @mailbox.save
        render json: @mailbox, status: :created
      else
        render json: @mailbox.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /mailboxes/1
    def update
      if @mailbox.update(mailbox_params)
        render json: @mailbox
      else
        render json: @mailbox.errors, status: :unprocessable_entity
      end
    end

    # DELETE /mailboxes/1
    def destroy
      @mailbox.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_mailbox
        @mailbox = Mailbox.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def mailbox_params
        params.require(:mailbox).permit(:user_id, :alias)
      end

      
  end
end