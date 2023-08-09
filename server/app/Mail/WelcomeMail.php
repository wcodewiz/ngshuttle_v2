<?php

namespace App\Mail;

use App\Http\Controllers\EmailController;
use App\utils\ShopApp;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\HtmlString;

class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;
    private $user;
    private $appName;

    /**
     * Create a new message instance.
     */
    public function __construct($user)
    {
        $this->user=$user;
        $this->appName=ShopApp::appName();
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to '.ShopApp::appName()
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $name=explode("@",$this->user->email)[0];

        return new Content(
            view:"mail.mail",
            with:["subject"=>"Welcome to $this->appName",
            "body"=>new HtmlString("Hello $name, <br>
            <h4 style='text-align:center;width:100%;'>Welcome to $this->appName</h4>. <hr/>
            <p>Your No.1 shopping express and business easy</p><br><article>make money with ease, own a virtual
            store online,sell your product or affliated product on your vendor easily!!</article>"),]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}